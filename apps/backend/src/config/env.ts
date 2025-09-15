import { z } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.string().transform((v) => parseInt(v, 10)).pipe(z.number().int().positive()).default("4000" as unknown as number),
  ALLOWED_ORIGIN: z.string().url().optional()
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
  return env;
};


