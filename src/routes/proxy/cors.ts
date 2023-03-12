import { Router } from "express";
import { headers, request, utils } from "../../utils";
const querystring = require("querystring");

const router = Router();

router.get("/*", async (req, res) => {
  const params = (req.params as any)[0];
  const query = req.query as any;

  const referer = query.referer,
    headers = query.headers;
  if (query.referer) delete query.referer;

  if (query.headers) delete query.headers;

  // add query to url and remove trailing slash
  const url = new URL(params);
  url.search = new URLSearchParams(query).toString();

  const proxyReq = request.requestHttp(url, (proxyRes: any) => {
    utils.removeCorsHeaders(proxyRes.headers);
    res.writeHead(proxyRes.statusCode as number, {
      ...proxyRes.headers,
      "access-control-allow-origin": "*",
      "access-control-allow-headers": "*",
      "access-control-allow-methods": "*",
    });
    proxyRes.pipe(res, { end: true });
  });

  req.pipe(proxyReq, { end: true });

  proxyReq.on("error", (err) => {
    console.error(err);
    res.status(500).send("Something broke!");
  });
});

export default router;
