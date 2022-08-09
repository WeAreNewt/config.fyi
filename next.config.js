/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    DATADOG_APPLICATION_ID: process.env.DATADOG_APPLICATION_ID,
    DATADOG_CLIENT_TOKEN: process.env.DATADOG_CLIENT_TOKEN
  }
}

module.exports = nextConfig
