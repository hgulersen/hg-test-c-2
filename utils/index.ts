import * as FileSystem from "expo-file-system";
import { Buffer } from "buffer";

/**
 * Downloads and caches images from an array of URLs.
 * @param urls An array of image URLs to download and cache.
 * @returns A Promise that resolves when all images have been downloaded and cached.
 */
export const prefetchImages = async (urls: string[]) => {
  const downloadPromises = urls.map((url) => downloadImage(url));
  await Promise.all(downloadPromises);
};

/**
 * Downloads an image from the given URL and saves it to the document directory.
 * @param url - The URL of the image to download.
 * @param forceIfCached - If true, the image will be downloaded even if it is already cached.
 * @returns A Promise that resolves to the downloaded image.
 */
const downloadImage = async (url: string, forceIfCached = false) => {
  if (!FileSystem.documentDirectory) {
    console.warn(
      "documentDirectory was not found when trying to download image"
    );
    return;
  }

  const cacheInfo = await getImageCacheInfo(url);

  if (!forceIfCached && cacheInfo.cached) {
    return;
  }

  const base64url = getBase64url(url);

  const downloadResumable = FileSystem.createDownloadResumable(
    url,
    FileSystem.documentDirectory + base64url,
    {}
  );
  const res = await downloadResumable.downloadAsync();
  return res;
};

/**
 * Returns information about whether an image is cached and its URI.
 * @param url - The URL of the image to check.
 * @returns An object containing whether the image is cached and its URI.
 */
const getImageCacheInfo = async (url: string) => {
  if (!FileSystem.documentDirectory) {
    console.warn(
      "documentDirectory was not found when trying to check if image is cached"
    );
    return { cached: false, uri: url };
  }
  const base64url = getBase64url(url);
  const file = await FileSystem.getInfoAsync(
    FileSystem.documentDirectory + base64url
  );
  return { cached: file.exists, uri: file.uri };
};

/**
 * Returns the image URI information for the given URL.
 * If the image is already cached, returns the local URI.
 * Otherwise, returns the remote URI.
 * @param url - The URL of the image.
 * @returns A promise that resolves to an object containing the type and URI of the image.
 */
export const getImageUri = async (url: string): Promise<ImageUriInfo> => {
  const cacheInfo = await getImageCacheInfo(url);
  if (cacheInfo.cached) {
    return { type: "local", uri: cacheInfo.uri };
  }
  return { type: "remote", uri: url };
};

/**
 * Converts a string to base64url format.
 * @param url - The string to be converted.
 * @returns The base64url format of the input string.
 */
const getBase64url = (url: string) => {
  return Buffer.from(url, "utf-8").toString("base64");
};
