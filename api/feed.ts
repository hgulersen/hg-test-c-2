import axios from "axios";
import config from "../config";
import { prefetchImages } from "../utils";

// getOneQuestion returns a single question from the API
export const fetchOneQuestion = async (): Promise<ForYouApiResponse> => {
  try {
    const response = await axios.get(
      `${config.baseApiUrl}/${config.forYouApi}`
    );
    return {
      data: response.data,
    };
  } catch (error: any) {
    return {
      error: error,
    };
  }
};

export const fetchNQuestionsInParallel = async (
  n: number,
  shouldPrefetchImages: boolean = false
): Promise<Question[]> => {
  const promises = Array(n)
    .fill(null)
    .map(() => fetchOneQuestion());
  const responses = await Promise.all(promises);
  const data = responses
    .filter((d): d is { data: Question } => !!d)
    .map((d) => d.data);

  if (shouldPrefetchImages) {
    const imageUrls = data.map((d) => d.image);
    await prefetchImages(imageUrls);
  }

  return data;
};

export const getAnswer = async (
  questionId: number
): Promise<AnswerApiResponse> => {
  try {
    const response = await axios.get(
      `${config.baseApiUrl}/${config.answerApi}?id=${questionId}`
    );
    return {
      data: response.data,
    };
  } catch (error: any) {
    return {
      error: error,
    };
  }
};
