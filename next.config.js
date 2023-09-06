/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/login',
        destination: 'https://www.medicall.pk/medi-app-api/login', // Replace with the actual API URL
      },
      {
        source: '/api/register',
        destination: 'https://www.medicall.pk/medi-app-api/register-doctor', // Replace with the actual API URL
      },
      {
        source: '/api/update',
        destination: 'https://www.medicall.pk/medi-app-api/auth/doctor/profile/update', // Replace with the actual API URL
      },
    ];
  },
};