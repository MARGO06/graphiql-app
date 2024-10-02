import { decodeUrlFromBase64, encodeUrlToBase64 } from '@/utils/base64';
import { getCurrentUrlFromLocalStorage } from '@/services/baseURL';

export const getURL = (url: string) => {
  let err = '';
  try {
    const urlUTF8 = decodeUrlFromBase64(url);
    const urlObj = new URL(urlUTF8);
    const searchParams = new URLSearchParams(urlObj.search);
    const sdlQueryParam = searchParams.get('sdl');
    const sdlParam = sdlQueryParam?.split('/')[0];
    const urlNew = urlUTF8.split('?sdl')[0];
    const queryParam = sdlQueryParam?.split('/?query=')[1];
    return { sdlParam, urlNew, queryParam };
  } catch (error) {
    err = 'Invalid URL, check data';
    return { err };
  }
};

export const updateUrl = (newSlug: string) => {
  const baseUrl = getCurrentUrlFromLocalStorage();
  const encodedUrl = encodeUrlToBase64(newSlug);
  const newPath = `${baseUrl}/graphiql/${encodedUrl}`;

  if (window.location.pathname !== newPath) {
    window.history.pushState(null, '', newPath);
  }
};

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
