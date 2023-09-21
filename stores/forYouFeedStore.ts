import { create } from "zustand";
import {
  fetchNQuestionsInParallel,
  fetchOneQuestion,
  getAnswer,
} from "../api/feed";

/**
 * The state of the For You Feed store.
 */
interface ForYouFeedState {
  questions: Question[];
  initialFetchComplete: boolean;
  loading: boolean;
  error: boolean;
  currentQuestionId: number | null;
  progress: {
    [questionId: number]: {
      correctOptionId: string | null;
      selectedOptionId: string | null;
    };
  };
  progressTracker: {
    isOptionSelectedAndCorrect(questionId: number, optionId: string): boolean;
    isOptionSelectedAndWrong(questionId: number, optionId: string): boolean;
    isOptionGreen(questionId: number, optionId: string): boolean;
    isOptionRed(questionId: number, optionId: string): boolean;
  };
  fetchMore: () => Promise<void>;
  fetchInitialQuestions: () => Promise<void>;
  setCurrentQuestionId: (id: number | null, prefetchAnswer?: boolean) => void;
  getSetAnswerForQuestion: (questionId: number) => Promise<void>;
  answerQuestion: (questionId: number, optionId: string) => void;
  addNewQuestionsToProgress: (questions: Question[]) => void;
}

/**
 * Creates a For You Feed store using the provided state.
 * @returns The For You Feed store.
 */
const useForYouFeedStore = create<ForYouFeedState>()((set, get) => ({
  /**
   * The list of questions in the For You Feed.
   */
  questions: [],

  /**
   * Whether the initial fetch of questions has been completed.
   */
  initialFetchComplete: false,

  /**
   * Whether the store is currently loading data.
   */
  loading: false,

  /**
   * Whether an error occurred while fetching data.
   */
  error: false,

  /**
   * Fetches more questions for the For You Feed.
   */
  fetchMore: async () => {
    set({ loading: true });
    const data = await fetchNQuestionsInParallel(5, true);
    if (data.length > 0) {
      set({
        questions: [...get().questions, ...data],
        loading: false,
      });
      get().addNewQuestionsToProgress(data);
    }
  },

  /**
   * Fetches the initial questions for the For You Feed.
   */
  fetchInitialQuestions: async () => {
    set({ loading: true });
    const data = await fetchNQuestionsInParallel(5, true);

    if (data.length > 0) {
      set({
        questions: data,
        initialFetchComplete: true,
        loading: false,
      });
      get().addNewQuestionsToProgress(data);
    } else {
      set({ loading: false, error: true, initialFetchComplete: true });
    }
  },

  /**
   * Sets the current question ID and optionally prefetches the answer.
   * @param id - The ID of the current question.
   * @param prefetchAnswer - Whether to prefetch the answer for the current question.
   */
  setCurrentQuestionId: (id: number | null, prefetchAnswer = true) => {
    set({ currentQuestionId: id });
    if (prefetchAnswer && id != null) {
      get().getSetAnswerForQuestion(id);
    }
  },

  /**
   * Prefetches the answer for the specified question.
   * @param questionId - The ID of the question to prefetch the answer for.
   */
  getSetAnswerForQuestion: async (questionId: number) => {
    // check if we already have the answer
    const progress = get().progress;
    if (progress[questionId]?.correctOptionId) {
      return;
    }

    // we do not have the answer, fetch it from the api
    const response = await getAnswer(questionId);
    if (response.data && response.data.correct_options.length == 1) {
      // set the correct answer as a combination of the question id and the option id
      const correctOptionId = concatQuestionAndOption(
        questionId,
        response.data.correct_options[0].id
      );

      set({
        progress: {
          ...progress,
          [questionId]: { correctOptionId, selectedOptionId: null },
        },
      });
    }
  },

  /**
   * The ID of the current question.
   */
  currentQuestionId: null,

  /**
   * The progress of the user's answers to each question.
   */
  progress: {},

  /**
   * Helper methods for tracking the progress of the user's answers.
   */
  progressTracker: {
    /**
     * Whether the specified option is selected and correct for the specified question.
     * @param questionId - The ID of the question.
     * @param optionId - The ID of the option.
     * @returns Whether the specified option is selected and correct for the specified question.
     */
    isOptionSelectedAndCorrect(questionId: number, optionId: string) {
      const selectedOptionId = get().progress[questionId]?.selectedOptionId;
      const correctOptionId = get().progress[questionId]?.correctOptionId;
      return (
        concatQuestionAndOption(questionId, optionId) === correctOptionId &&
        selectedOptionId === concatQuestionAndOption(questionId, optionId)
      );
    },

    /**
     * Whether the specified option is selected and wrong for the specified question.
     * @param questionId - The ID of the question.
     * @param optionId - The ID of the option.
     * @returns Whether the specified option is selected and wrong for the specified question.
     */
    isOptionSelectedAndWrong(questionId: number, optionId: string) {
      const selectedOptionId = get().progress[questionId]?.selectedOptionId;
      const correctOptionId = get().progress[questionId]?.correctOptionId;

      return (
        concatQuestionAndOption(questionId, optionId) !== correctOptionId &&
        selectedOptionId === concatQuestionAndOption(questionId, optionId)
      );
    },

    /**
     * Whether the specified option is green (i.e. selected and correct) for the specified question.
     * @param questionId - The ID of the question.
     * @param optionId - The ID of the option.
     * @returns Whether the specified option is green for the specified question.
     */
    isOptionGreen(questionId: number, optionId: string) {
      const selectedOptionId = get().progress[questionId]?.selectedOptionId;
      const correctOptionId = get().progress[questionId]?.correctOptionId;

      return (
        concatQuestionAndOption(questionId, optionId) === correctOptionId &&
        selectedOptionId !== null
      );
    },

    /**
     * Whether the specified option is red (i.e. selected and wrong) for the specified question.
     * @param questionId - The ID of the question.
     * @param optionId - The ID of the option.
     * @returns Whether the specified option is red for the specified question.
     */
    isOptionRed(questionId: number, optionId: string) {
      const selectedOptionId = get().progress[questionId]?.selectedOptionId;
      const correctOptionId = get().progress[questionId]?.correctOptionId;

      return (
        concatQuestionAndOption(questionId, optionId) !== correctOptionId &&
        selectedOptionId === concatQuestionAndOption(questionId, optionId)
      );
    },
  },

  /**
   * Answers the specified question with the specified option.
   * @param questionId - The ID of the question to answer.
   * @param optionId - The ID of the option to select.
   */
  answerQuestion: (questionId: number, optionId: string) => {
    const currentProgress = get().progress;

    // if the question is already answered, do nothing
    if (
      currentProgress[questionId]?.selectedOptionId ||
      currentProgress[questionId].correctOptionId == null
    ) {
      return;
    }

    set({
      progress: {
        ...currentProgress,
        [questionId]: {
          ...currentProgress[questionId],
          selectedOptionId: concatQuestionAndOption(questionId, optionId),
        },
      },
    });
  },

  /**
   * Adds new questions to the user's progress tracker.
   * @param questions - The questions to add.
   */
  addNewQuestionsToProgress: (questions: Question[]) => {
    for (const question of questions) {
      const currentProgress = get().progress;
      if (question.id in currentProgress) {
        continue;
      }
      set({
        progress: {
          ...currentProgress,
          [question.id]: {
            correctOptionId: null,
            selectedOptionId: null,
          },
        },
      });
    }
  },
}));

/**
 * Concatenates a question ID and an option ID with a pipe character.
 * @param questionId - The ID of the question.
 * @param optionId - The ID of the option.
 * @returns The concatenated string of the question ID and option ID, separated by a pipe character.
 * If either questionId or optionId is null, returns null.
 */
const concatQuestionAndOption = (
  questionId: number | null,
  optionId: string | null
) => {
  if (questionId == null || optionId == null) {
    return null;
  }
  return questionId.toString() + "|" + optionId;
};

export default useForYouFeedStore;
