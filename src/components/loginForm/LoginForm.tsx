'use client';

import React, { useState } from 'react';
import { Form } from '@/components/form/Form';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { ErrorMessage } from '@/components/errorMessage/ErrorMessage';
import { getUserLocale } from '@/services/locale';
import { useTranslations } from 'next-intl';

export const LoginForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { updateToken } = useAuth();
  const t = useTranslations('errors');

  const handleErrorReset = () => {
    setError(null);
  };

  const login = async (email: string, password: string) => {
    try {
      const locale = await getUserLocale();
      const response = await fetch('/api/saveToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, isLogin: true, locale }),
      });
      const user = await response.json();
      if (user.token) {
        updateToken(user.token);
        router.replace('/');
      } else {
        setError(user.error);
      }
    } catch (e) {
      setError(t('an unexpected error'));
    }
  };
  return (
    <>
      {error && <ErrorMessage message={error} errorReset={handleErrorReset} />}
      <Form handleFormSubmit={login} />
    </>
  );
};
