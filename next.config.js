/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "sun9-45.userapi.com" }],
  },
};

module.exports = nextConfig;
