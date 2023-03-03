// next.config.js

const images = {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 's2.coinmarketcap.com',
      port: '',
      pathname: '/static/img/coins/128x128/*',
    },
  ],
};

const nextConfig = {
  reactStrictMode: true,
  images,
};

module.exports = nextConfig;
