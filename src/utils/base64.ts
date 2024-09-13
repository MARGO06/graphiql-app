export const encodeUrlToBase64 = (url: string) => {
  return Buffer.from(encodeURIComponent(url)).toString('base64');
};
