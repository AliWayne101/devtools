/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["avatars.githubusercontent.com", "devtools-wayne.vercel.app"],
  }
}

module.exports = nextConfig
