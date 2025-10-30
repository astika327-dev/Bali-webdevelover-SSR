// @ts-check
import nextBundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = nextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing Next.js config here
  // e.g., images, experimental features, etc.
};

export default withBundleAnalyzer(nextConfig);
