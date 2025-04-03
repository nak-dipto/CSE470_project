/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdna.pcpartpicker.com",
      },
    ],
  },
};

export default nextConfig;
