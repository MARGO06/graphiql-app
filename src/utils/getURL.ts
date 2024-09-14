import { decodeUrlFromBase64 } from '@/utils/fromBase64';

export const getURL = (url: string) => {
  const urlUTF8 = decodeUrlFromBase64(url);
  const urlObj = new URL(urlUTF8);
  const searchParams = new URLSearchParams(urlObj.search);
  const sdlParam = searchParams.get('sdl');
  const urlNew = urlUTF8.split('?sdl')[0];
  return { sdlParam, urlNew };
};
