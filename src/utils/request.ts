import https from "https";
import http from "http";

import { Agent } from "https";

const httpsAgent = new Agent({
  keepAlive: true,
  keepAliveMsecs: 10000,
  maxSockets: 50,
  maxFreeSockets: 20,
  timeout: 60000,
  rejectUnauthorized: false,
});

interface options {
  protocol: string;
  hostname: string;
  path: string;
  method?: string;
  headers?: any;
  [key: string]: any;
}

export const requestHttp = (url: URL | options, options: any) => {
  if (url.protocol.toLowerCase().includes("https")) {
    return https.request(url, { ...options });
  } else {
    return http.request(url, { ...options, agent: httpsAgent });
  }
};
