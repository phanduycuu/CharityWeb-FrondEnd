/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5006",
        pathname: "/images/**", // hoặc pathname: '**' nếu muốn cho tất cả
      },
    ],
  },
};

export default nextConfig;
