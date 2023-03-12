import https from "https";
import http from "http";

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
    return https.request(url, options);
  } else {
    return http.request(url, options);
  }
};
