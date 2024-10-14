import { useState, useEffect } from 'react';

export interface HistoryItem {
  method: string;
  url: string;
  urlBase64: string;
  date: Date;
}

export const useHistory = () => {
  const [requests, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem('history');
    if (storedHistory?.length) {
      try {
        setHistory(JSON.parse(storedHistory));
      } catch (error) {
        throw error;
      }
    }
  }, []);

  return {
    requests: requests,
  };
};
