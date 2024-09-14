export const decodeUrlFromBase64 = (url: string) => {
  return decodeURIComponent(atob(url));
};
