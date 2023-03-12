import https from "https";
import http from "http";

export const requestHttp = (url: URL, options: any) => {
  if (url.protocol.toLowerCase().includes("https")) {
    return https.request(url, options);
  } else {
    return http.request(url, options);
  }
};
