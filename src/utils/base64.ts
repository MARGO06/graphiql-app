export const encodeUrlToBase64 = (url: string) => {
  return btoa(encodeURIComponent(url));
};

export const decodeUrlFromBase64 = (url: string) => {
  return decodeURIComponent(atob(url));
};
