/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        // Placeholder de imágenes pendientes
        protocol: "https",
        hostname: "via.placeholder.com",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  },
};

module.exports = nextConfig;
