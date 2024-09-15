import { defaultLocale } from '@/config';
import { getUserLocale } from '@/services/locale';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
  let locale = await getUserLocale();
  if (!locale) {
    locale = defaultLocale;
  }
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
