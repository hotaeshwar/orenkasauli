/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  output: "export",
  distDir: process.env.NODE_ENV === "production" ? "dist" : ".next",
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
