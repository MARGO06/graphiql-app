export interface HistoryItem {
  method: string;
  url: string;
  urlBase64: string;
  date: string;
  headerParams?: string;
}

export const saveToHistory = (
  method: string,
  url: string,
  urlBase64: string,
  headerParams?: string,
) => {
  if (typeof window !== 'undefined') {
    const existingHistory = localStorage.getItem('history');
    const historyArray: HistoryItem[] = existingHistory ? JSON.parse(existingHistory) : [];

    const newEntry: HistoryItem = {
      date: new Date().toISOString(),
      method,
      url,
      urlBase64,
      headerParams,
    };

    historyArray.push(newEntry);

    localStorage.setItem('history', JSON.stringify(historyArray));
  }
};
