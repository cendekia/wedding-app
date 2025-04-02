/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // This allows us to use API routes without implementing all route handlers
    // This silences the "Cannot find module for page" error during build
    instrumentationHook: false,
  }
}

module.exports = nextConfig 