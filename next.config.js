/**
 * Next.js configuration for Netlify deployment.
 * Sets the Turbopack root to the project directory to avoid warnings
 * about multiple lockfiles, and defines the output folder.
 */
module.exports = {
  // Ensure Turbopack uses the correct root directory
  // (helps Netlify build detect the proper workspace)
  turbopack: {
    root: __dirname,
  },
  // Netlify plugin expects the build output in .next
  output: "standalone",
  // Optional: enable trailing slash for cleaner URLs
  trailingSlash: true,
};
