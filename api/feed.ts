import axios from "axios";
import config from "../config";
import { prefetchImages } from "../utils";

/**
 * Fetches a single question from the For You API.
 * @returns A Promise that resolves to a ForYouApiResponse object containing the question data, or an error object if the request fails.
 */
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

/**
 * Fetches n number of questions in parallel.
 * @param n - The number of questions to fetch.
 * @param shouldPrefetchImages - Whether or not to prefetch images.
 * @returns A Promise that resolves to an array of Question objects.
 */
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

/**
 * Retrieves an answer from the API based on the provided question ID.
 * @param questionId The ID of the question to retrieve the answer for.
 * @returns A Promise that resolves to an object containing the answer data or an error object if the request fails.
 */
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
