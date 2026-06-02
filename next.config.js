// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure the build output is compatible with Netlify plugin
  output: 'standalone',
  trailingSlash: true,

};

module.exports = nextConfig;
