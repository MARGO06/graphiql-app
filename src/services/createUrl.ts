import { getCurrentUrlFromLocalStorage } from './baseURL';

function encodeBase64(data: string) {
  return btoa(unescape(encodeURIComponent(data))); // TODO: change to non deprecated!!!
}

export function decodeBase64(encoded: string): string {
  try {
    const urlDecoded = decodeURIComponent(encoded);

    const base64Pattern = /^[A-Za-z0-9+/]+={0,2}$/;
    if (!base64Pattern.test(urlDecoded)) {
      throw new Error('Uncorrect string');
      // TODO: message about uncorrect string!!!
    }
    return atob(urlDecoded);
  } catch (error) {
    // TODO: message about decoded error!!!
    return '';
  }
}

export function getUrl(method: string, currentUrl: string, body = null, headers = {}) {
  const baseUrl = getCurrentUrlFromLocalStorage();
  const encodedUrl = encodeBase64(currentUrl);
  let url = `${baseUrl}/${method}/${encodedUrl}`;

  if (body) {
    const encodedBody = encodeBase64(JSON.stringify(body));
    url += `/${encodedBody}`;
  }

  const queryParams = Object.entries(headers)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&');

  if (queryParams) {
    url += `?${queryParams}`;
  }

  return url;
}
