import express from "express";
import cors from "cors";
import ApiRouter from "./api/ApiRouter";

export default function apiIndex(port: number) {
  const app = express();

  app.use(
    cors({
      origin: "http://192.168.55.12:5173", // Your frontend URL
      methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific methods (optional)
    }),
  );
  app.use(express.json());
  app.use("/api/", ApiRouter);

  app.listen(port, () => console.log(`Started listening on port: ${port}`));
}

apiIndex(3001);
