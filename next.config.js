/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'crystalrecruitment.s3.amazonaws.com',
      },
    ],
    domains: ['flowbite.com'],
  },

  env: {
    BASE_URL: process.env.BASE_URL,

    // AWS
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_DEFAULT_REGION: process.env.AWS_DEFAULT_REGION,
    AWS_BUCKET: process.env.AWS_BUCKET,
    AWS_USE_PATH_STYLE_ENDPOINT: process.env.AWS_USE_PATH_STYLE_ENDPOINT,

    // Firebase
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_VAPID_KEY: process.env.FIREBASE_VAPID_KEY,
  },

  publicRuntimeConfig: {
    BASE_URL: process.env.BASE_URL,

    // AWS
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_DEFAULT_REGION: process.env.AWS_DEFAULT_REGION,
    AWS_BUCKET: process.env.AWS_BUCKET,
    AWS_USE_PATH_STYLE_ENDPOINT: process.env.AWS_USE_PATH_STYLE_ENDPOINT,

    // Firebase
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_VAPID_KEY: process.env.FIREBASE_VAPID_KEY,
  },

  serverRuntimeConfig: {
    BASE_URL: process.env.BASE_URL,
  },
};

module.exports = nextConfig;
