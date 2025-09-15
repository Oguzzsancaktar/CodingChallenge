import { z } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  ALLOWED_ORIGIN: z.string().url().optional(),
  AUTH_JWT_SECRET: z.string().min(16).default("dev-secret-change-me"),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(60_000),
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(100),
  GITHUB_CACHE_TTL_MS: z.coerce.number().int().positive().default(60_000),
  GITHUB_TOKEN: z.string().optional(),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]).default("info")
});

export type Env = z.infer<typeof EnvSchema> & { PORT: number };

export const loadEnv = (): Env => {
  const parsed = EnvSchema.safeParse(process.env);
  if (!parsed.success) {
    // Simplified error output for speed during dev
    console.error("Invalid environment variables:", parsed.error.flatten().fieldErrors);
    throw new Error("ENV_VALIDATION_ERROR");
  }
  const env = parsed.data as Env;
  if (!env.ALLOWED_ORIGIN) {
    env.ALLOWED_ORIGIN = "http://localhost:5173";
  }
  if (env.AUTH_JWT_SECRET === "dev-secret-change-me" && env.NODE_ENV === "production") {
    console.warn("Security warning: Using default AUTH_JWT_SECRET in production.");
  }
  return env;
};


