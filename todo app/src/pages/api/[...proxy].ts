// pages/api/[...proxy].ts (or .js)
import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import { IncomingMessage, ServerResponse } from 'http';
import http from 'http';

export const config = {
  api: {
    bodyParser: false,
  },
};

const API_URL = 'http://localhost:8080';

const proxy = createProxyMiddleware({
  target: API_URL,
  changeOrigin: true,
  pathRewrite: { '^/api': '' },
  onProxyReq: (proxyReq: http.ClientRequest, req: http.IncomingMessage & { cookies?: { token?: string } }) => {
    const token = req.cookies?.token;
    if (token) {
      proxyReq.setHeader('Authorization', `Bearer ${token}`);
    }
  },
} as Options<IncomingMessage, ServerResponse<IncomingMessage>>);

import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return proxy(req, res, (result) => {
    if (result instanceof Error) {
      throw result;
    }
  });
}
