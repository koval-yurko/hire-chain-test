/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'k9fchyazetkyltjo.public.blob.vercel-storage.com',
      },
    ],
  },
}

module.exports = nextConfig
