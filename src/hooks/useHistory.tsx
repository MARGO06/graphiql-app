import { useState, useEffect } from 'react';

interface HistoryItem {
  method: string;
  url: string;
  urlBase64: string;
}

export const useHistory = () => {
  const [requests, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem('history');
    if (storedHistory) {
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
