// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Export as static site for Netlify
  output: 'export',
  trailingSlash: true,
  // Disable linting during build for Netlify
  eslint: { ignoreDuringBuilds: true },
};

module.exports = nextConfig;
