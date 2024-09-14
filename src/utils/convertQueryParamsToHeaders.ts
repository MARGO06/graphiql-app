export const convertQueryParamsToHeaders = (params?: Record<string, string>) => {
  if (!params) return [];

  return Object.entries(params).map(([key, value], index) => ({
    key,
    value,
    id: index + key,
  }));
};
