require("dotenv").config();
import express from "express";
import http from "http";
import cors from "cors";

import routes from "./routes";

const app = express();

const PORT = Number(process.env.PORT) || 4001;

(async () => {
  try {
    app.use(cors());

    app.use("/proxy", routes);

    http
      .createServer(app)
      .listen(PORT, () => {
        console.log(`🚀 server listening on localhost:${PORT}`);
      })
      .on("connection", (socket) => {
        socket.setNoDelay(true);
      });
  } catch (err) {
    console.error(err);
  }
})();
