import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['leafy-halva-b233d7.netlify.app'],
    },
  },
};

export default withNextIntl(nextConfig);
