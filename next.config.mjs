import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    OKX_API_KEY: process.env.OKX_API_KEY,
    OKX_SECRET_KEY: process.env.OKX_SECRET_KEY,
    OKX_PASSPHRASE: process.env.OKX_PASSPHRASE,
    OKX_PROJECT_ID: process.env.OKX_PROJECT_ID,
  },
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "app.aave.com",
      "images.unsplash.com",
      "cloudflare-ipfs.com",
      "gateway.ipfs.io",
      "api.qrserver.com", // 添加此行
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      resourceQuery: /icon/,
      use: ["@svgr/webpack"],
    });
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      resourceQuery: { not: [/icon/] },
      loader: "next-image-loader",
      options: { assetPrefix: "" },
    });
    return config;
  },
  ...withPWA({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
  }),
};

export default nextConfig;
