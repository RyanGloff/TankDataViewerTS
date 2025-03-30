import express from "express";
import ApiRouter from "./lib/api/ApiRouter";

export default function apiIndex(port) {
  const app = express();

  app.use("/api/", ApiRouter);

  app.listen(port, () => console.log(`Started listening on port: ${port}`));
}

apiIndex(3001);
