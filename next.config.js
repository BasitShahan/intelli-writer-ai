const webpack = require('webpack');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // compiler: {
  //   removeConsole: true,
  // },
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.plugins.push(
  //       new webpack.DefinePlugin({
  //         "process.env.NODE_ENV": JSON.stringify("production"),
  //       })
  //     );
  //   }

  //   return config;
  // },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.midjourney.com",
        pathname: "**",
      },
    ],
  },
  swcMinify: true,
};

module.exports = nextConfig;
