'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const t = useTranslations('Error');

  const [messageError, setMessageError] = useState('');
  useEffect(() => {
    const errorName = error.name;
    const errorCause = error.cause;
    const errorDigest = error.digest;
    if (errorName === 'Error' && errorCause === undefined && errorDigest === undefined) {
      setMessageError(': network error');
    }
  }, [error]);

  return (
    <aside>
      <h2>
        {t('welcome')} {messageError ?? ''}
      </h2>
      <div className="actions">
        <button
          onClick={() => {
            reset();
          }}
        >
          {t('tryagain')}
        </button>
        <button onClick={() => router.push('/main')}> {t('back')}</button>
      </div>
    </aside>
  );
}
