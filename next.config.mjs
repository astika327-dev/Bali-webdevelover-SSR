// @ts-check

import withNextIntl from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing Next.js config here
  // e.g., images, experimental features, etc.
};

export default withNextIntl('./i18n.ts')(nextConfig);
