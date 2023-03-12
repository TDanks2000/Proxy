import http from "http";
import { Router } from "express";
import { headers, utils } from "../../utils";
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

  // set headers from url
  const options = {
    method: req.method,
    hostname: url.hostname,
    path: url.pathname + url.search,
    headers: {
      Host: req.headers.host,
    },
  };

  const proxy = await http.request(url, (r) => {
    utils.removeCorsHeaders(r.headers);

    res.writeHead(r.statusCode as number, {
      ...r.headers,
      host: req.headers.host,
    });

    r.pipe(res, {
      end: true,
    });
  });

  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-allow-headers", "*");
  res.setHeader("access-control-allow-methods", "*");

  // send back the response
  req.pipe(proxy, {
    end: true,
  });

  proxy.on("error", (err) => {
    console.error(err);
    res.status(500).send("Something broke!");
  });
});

export default router;
