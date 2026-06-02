// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure the build output is compatible with Netlify
  output: 'standalone',
  // Optional: trailing slash for cleaner URLs (optional)
  trailingSlash: true,
  // Disable linting during build for Netlify
  eslint: { ignoreDuringBuilds: true },
};

module.exports = nextConfig;
