import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en-US', 'es'],
    defaultLocale: 'en-US',
    localeDetection: false,
  },
};

export default withNextIntl(nextConfig);
