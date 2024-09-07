import React, { useEffect, useState } from 'react';
import style from '@/components/errorMessage/ErrorMessage.module.scss';
import { ErrorMessageProps } from '@/types/errorMessage';

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  duration = 3000,
  errorReset,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        if (errorReset) {
          errorReset();
        }
      }, duration);

      return () => {
        clearTimeout(timer);
      };
    } else {
      setVisible(false);
    }
  }, [message, duration, errorReset]);

  return visible ? (
    <div className={style.error}>
      <div className={style.message}>{message}</div>
    </div>
  ) : null;
};
