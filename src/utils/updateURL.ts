import { getCurrentUrlFromLocalStorage } from '@/services/baseURL';
import { encodeUrlToBase64 } from '@/utils/base64';

export const updateUrl = (newSlug: string) => {
  const baseUrl = getCurrentUrlFromLocalStorage();
  const encodedUrl = encodeUrlToBase64(newSlug);
  const newPath = `${baseUrl}/graphiql/${encodedUrl}`;

  if (window.location.pathname !== newPath) {
    window.history.pushState(null, '', newPath);
  }
};
