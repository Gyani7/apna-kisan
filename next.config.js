const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA({
  // experimental: {
  //   appDir: true,
  // },
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
});
