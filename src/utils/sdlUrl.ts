import { encodeUrlToBase64 } from '@/utils/base64';

export const updateSdlUrl = (sdl: string, url: string) => {
  const newSdl = sdl.slice(url.length);
  const encodedSdl = encodeUrlToBase64(newSdl);
  const newUrl = `${url}?sdl=${encodeURIComponent(encodedSdl)}`;
  return newUrl;
};

export const updateQuery = (query: string) => {
  const encodedSdl = encodeUrlToBase64(query);
  return encodedSdl;
};
