'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ErrorBoundary({
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
    if (errorName === 'Error' && !errorCause && !errorDigest) {
      setMessageError(': network error');
    } else {
      /* c8 ignore next 2 */
      setMessageError(`: ${errorCause}`);
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
        <button onClick={() => router.push('/')}> {t('back')}</button>
      </div>
    </aside>
  );
}
