'use client';

import React, { useState } from 'react';
import { Form } from '@/components/form/Form';
import { useRouter } from 'next/navigation';
import { writeUserData } from '@/utils/saveDataInFirebase';
import { readUserData } from '@/utils/getDataInFirebase';
import { useAuth } from '@/hooks/useAuth';
import { ErrorMessage } from '@/components/errorMessage/ErrorMessage';
import { getUserLocale } from '@/services/locale';
import { useTranslations } from 'next-intl';

export const RegistrationForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const { updateToken, updateUserName } = useAuth();
  const router = useRouter();
  const t = useTranslations('errors');

  const handleErrorReset = () => {
    setError(null);
  };

  const registration = async (email: string, password: string, name?: string) => {
    try {
      const locale = await getUserLocale();
      const response = await fetch('/api/saveToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, isLogin: false, locale }),
      });

      const user = await response.json();

      if (user.token) {
        updateToken(user.token);
        if (name) writeUserData(user.uid, name, email);
        const userData = await readUserData(user.uid);
        updateUserName(userData.username);
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
      <Form handleFormSubmit={registration} />
    </>
  );
};
