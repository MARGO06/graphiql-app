import React, { useEffect, useState } from 'react';
import style from '@/components/errorMessage/ErrorMessage.module.scss';
import { ErrorMessageProps } from '@/types/errorMessage';

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, duration = 3000 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  if (!visible) return null;

  return (
    <div className={style.error}>
      <div className={style.message}>{message}</div>
    </div>
  );
};
