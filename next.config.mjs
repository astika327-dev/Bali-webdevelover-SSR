
// @ts-check
import nextBundleAnalyzer from '@next/bundle-analyzer';
import path from 'path';
import { fileURLToPath } from 'url';

const withBundleAnalyzer = nextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

// Since __dirname is not available in ES modules, we need to create it
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // The webpack alias configuration was removed as it is suspected to interfere
  // with the Next.js Image Optimizer in a production environment.
  images: {
    unoptimized: true,
  },
};

export default withBundleAnalyzer(nextConfig);
