export const handleGetData = async (url: string, queries: string) => {
  try {
    const response = await fetch('/api/fetchGraphData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, queries }),
    });
    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.status);
    }
    return data;
  } catch (error) {
    const err = error as Error;
    const status = parseInt(err.message) || 500;
    throw { status };
  }
};
