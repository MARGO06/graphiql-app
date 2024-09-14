import { encodeUrlToBase64 } from '@/utils/base64';

export const updateUrl = (newSlug: string) => {
  const encodedUrl = encodeUrlToBase64(newSlug);
  const newPath = `graphiql/${encodedUrl}`;

  if (window.location.pathname !== newPath) {
    window.history.pushState(null, '', newPath);
  }
};
