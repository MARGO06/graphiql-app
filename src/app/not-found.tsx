'use client';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

export default function NotFound() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('NotFound');

  return (
    <aside>
      <h2>
        {t('welcome')} {pathname}
      </h2>
      <p>{t('info')}</p>
      <button onClick={() => router.push('/')}> {t('back')}</button>
    </aside>
  );
}
