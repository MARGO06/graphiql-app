export interface HistoryItem {
  method: string;
  url: string;
  urlBase64: string;
}

export const saveToHistory = (method: string, url: string, urlBase64: string) => {
  if (typeof window !== 'undefined') {
    const existingHistory = localStorage.getItem('history');
    const historyArray: HistoryItem[] = existingHistory ? JSON.parse(existingHistory) : [];

    const newEntry: HistoryItem = {
      method,
      url,
      urlBase64,
    };

    historyArray.push(newEntry);

    localStorage.setItem('history', JSON.stringify(historyArray));
  }
};
