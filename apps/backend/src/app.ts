import express from "express";
import helmet from "helmet";
import cors from "cors";
import pino from "pino";
import pinoHttp from "pino-http";
import rateLimit from "express-rate-limit";
import { healthRouter } from "./routes/health.js";

export const createApp = (allowedOrigin: string) => {
  const app = express();

  const logger = pino({ level: process.env.LOG_LEVEL || "info" });
  app.use(pinoHttp({ logger }));
  app.use(helmet());
  app.use(
    cors({
      origin: allowedOrigin,
      credentials: true
    })
  );
  app.use(express.json({ limit: "1mb" }));

  const api = express.Router();
  api.use(healthRouter);
  app.use("/api/v1", api);

  return app;
};


