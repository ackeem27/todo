// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;


// // next.config.js
// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = {
//   async rewrites() {
//     return [
//       {
//         source: '/api/:path*',
//         destination: 'http://localhost:8080/api/:path*', // Proxy to Backend
//       },
//     ];
//   },
// };


import { createProxyMiddleware } from 'http-proxy-middleware';

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/:path*', // Proxy to Backend
      },
    ];
  },
  async onProxyReq(proxyReq, req, res) {
    proxyReq.headers['Authorization'] = `Bearer ${req.cookies.token}`;
  },
};

export default nextConfig;
