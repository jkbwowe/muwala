// next.config.ts
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  maximumFileSizeToCacheInBytes: 50 * 1024 * 1024, // 50MB — allows large WASM files
  runtimeCaching: [
    {
      // ONNX models + encoding JSONs
      urlPattern: /\/models\/.*/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'muwala-models-v1',
        expiration: { maxEntries: 10 },
      },
    },
    {
      // WASM runtime files — cache permanently
      urlPattern: /\/onnx\/.*/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'muwala-onnx-runtime-v1',
        expiration: { maxEntries: 20 },
      },
    },
    {
      urlPattern: /\/assessment\/.*/,
      handler: 'StaleWhileRevalidate',
      options: { cacheName: 'muwala-pages-v1' },
    },
    {
      urlPattern: /\/_next\/static\/.*/,
      handler: 'CacheFirst',
      options: { cacheName: 'muwala-static-v1' },
    },
    {
      urlPattern: /\.(png|jpg|jpeg|svg|ico|woff2|woff|wasm)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'muwala-assets-v1',
        expiration: { maxEntries: 30 },
      },
    },
  ],
})

module.exports = withPWA({
  turbopack: {},
  webpack: (config: any) => {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };
    return config;
  },
})