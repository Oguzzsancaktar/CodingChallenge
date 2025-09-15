import express from "express";
import helmet from "helmet";
import cors from "cors";
import pinoHttp from "pino-http";
import rateLimit from "express-rate-limit";
import { healthRouter } from "./routes/health.js";
import { authRouter } from "./routes/auth.js";
import { profileRouter } from "./routes/profile.js";
import { githubRouter } from "./routes/github.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { loadEnv } from "./config/env.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger.js";

export const createApp = (allowedOrigin: string) => {
  const app = express();

  app.use(pinoHttp());
  app.use(helmet());
  const env = loadEnv();
  app.use(
    rateLimit({
      windowMs: env.RATE_LIMIT_WINDOW_MS,
      limit: env.RATE_LIMIT_MAX,
      standardHeaders: true,
      legacyHeaders: false
    })
  );
  app.use(
    cors({
      origin: allowedOrigin,
      credentials: true
    })
  );
  app.use(express.json({ limit: "1mb" }));

  const api = express.Router();
  api.use(healthRouter);
  api.use(authRouter);
  api.use(profileRouter);
  api.use(githubRouter);
  app.use("/api/v1", api);

  // Swagger docs
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/openapi.json", (_req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};


