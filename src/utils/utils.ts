import { blockedHeaders } from "./headers";

const removeCorsHeaders = (headers: any) => {
  blockedHeaders.forEach((header) => {
    delete headers[header];
  });
};

export { removeCorsHeaders };
