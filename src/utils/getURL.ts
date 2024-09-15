import { decodeUrlFromBase64 } from '@/utils/fromBase64';

export const getURL = (url: string) => {
  const urlUTF8 = decodeUrlFromBase64(url);
  const urlObj = new URL(urlUTF8);
  const searchParams = new URLSearchParams(urlObj.search);
  const sdlQueryParam = searchParams.get('sdl');
  const sdlParam = sdlQueryParam?.split('/')[0];
  const urlNew = urlUTF8.split('?sdl')[0];
  const queryParam = sdlQueryParam?.split('/?query=')[1];
  return { sdlParam, urlNew, queryParam };
};
