import { getCurrentUrlFromLocalStorage } from './baseURL';
import { saveToHistory } from './saveToHistory';

function encodeBase64(data: string) {
  return btoa(unescape(encodeURIComponent(data)));
}

export function decodeBase64(encoded: string): string {
  try {
    const urlDecoded = decodeURIComponent(encoded);

    const base64Pattern = /^[A-Za-z0-9+/]+={0,2}$/;
    if (!base64Pattern.test(urlDecoded)) {
      throw new Error('Uncorrect string');
    }
    return atob(urlDecoded);
  } catch (error) {
    return '';
  }
}

export function getUrl(
  method: string,
  currentUrl: string,
  body: string,
  headerParams: string,
  isSend: boolean,
) {
  const baseUrl = getCurrentUrlFromLocalStorage();
  const encodedUrl = encodeBase64(currentUrl);
  let url = `${baseUrl}/${method}/${encodedUrl}`;

  if (!currentUrl) {
    return url;
  }

  if (body) {
    const encodedBody = encodeBase64(body);
    url += `/${encodedBody}`;
  }

  if (headerParams) {
    url += `?${headerParams}`;
  }

  if (isSend) {
    saveToHistory(method, currentUrl, encodedUrl, headerParams);
  }

  return url;
}
