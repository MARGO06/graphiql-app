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

    let queryParam = '';
    let variableParam = '';
    let headersParam = '';

    if (sdlQueryParam) {
      const queryPart = sdlQueryParam.split('/?query=')[1];

      if (queryPart) {
        const variablePart = queryPart.split('/?variable=')[1];

        if (variablePart) {
          queryParam = queryPart.split('/?variable=')[0] || '';
          variableParam = variablePart.split('/?headers=')[0] || '';
          headersParam = variablePart.split('/?headers=')[1] || '';
        } else {
          queryParam = queryPart.split('/?headers=')[0] || '';
          headersParam = queryPart.split('/?headers=')[1] || '';
        }
      } else {
        headersParam = sdlQueryParam.split('/?headers=')[1] || '';
      }
    }
    if (headersParam) {
      headersParam = decodeURIComponent(headersParam);
    }

    return { sdlParam, urlNew, queryParam, variableParam, headersParam };
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

export const updateSdlUrl = (
  sdl: string,
  url: string,
  query?: string,
  variable?: string,
  headers?: string,
) => {
  const newSdl = sdl.slice(url.length);
  const encodedSdl = encodeUrlToBase64(newSdl);
  const newUrl = `${url}?sdl=${encodeURIComponent(encodedSdl)}`;

  let finalUrl = newUrl;

  if (query) {
    const encodedQuery = encodeUrlToBase64(query);
    finalUrl += `/?query=${encodeURIComponent(encodedQuery)}`;
  }

  if (variable) {
    const encodedVariable = encodeUrlToBase64(variable);
    finalUrl += `/?variable=${encodeURIComponent(encodedVariable)}`;
  }

  if (headers) {
    const encodedHeaders = encodeUrlToBase64(headers);
    finalUrl += `/?headers=${encodeURIComponent(encodedHeaders)}`;
  }

  return finalUrl;
};
