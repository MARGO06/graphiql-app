export const getQueryStringFromHeaders = (headers: { key: string; value: string }[]) => {
  return headers
    .filter((header) => header.key && header.value)
    .map((header) => `${encodeURIComponent(header.key)}=${encodeURIComponent(header.value)}`)
    .join('&');
};
