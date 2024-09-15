import { encodeUrlToBase64 } from '@/utils/base64';

export const updateSdlUrl = (sdl: string, url: string, query?: string) => {
  const newSdl = sdl.slice(url.length);
  const encodedSdl = encodeUrlToBase64(newSdl);
  const newUrl = `${url}?sdl=${encodeURIComponent(encodedSdl)}`;
  if (query) {
    const encodedQuery = encodeUrlToBase64(query);
    const newUrlQuery = `${newUrl}/?query=${encodeURIComponent(encodedQuery)}`;
    return newUrlQuery;
  }
  return newUrl;
};
