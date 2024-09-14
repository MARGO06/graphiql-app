export const encodeUrlToBase64 = (url: string) => {
  return btoa(encodeURIComponent(url));
};
