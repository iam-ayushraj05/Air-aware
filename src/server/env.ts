import { z } from "zod";

const ServerEnvSchema = z.object({
  AI_PROVIDER: z.enum(["gemini", "openai", "anthropic", "demo"]).default("demo"),
  AI_API_KEY: z.string().optional(),
  AI_MODEL: z.string().optional(),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

export type ServerEnv = z.infer<typeof ServerEnvSchema>;

let parsedEnv: ServerEnv | null = null;

export function getServerEnv(): ServerEnv {
  if (parsedEnv) return parsedEnv;

  const result = ServerEnvSchema.safeParse({
    AI_PROVIDER: process.env.AI_PROVIDER || "demo",
    AI_API_KEY: process.env.AI_API_KEY,
    AI_MODEL: process.env.AI_MODEL,
    NODE_ENV: process.env.NODE_ENV || "development",
  });

  if (!result.success) {
    console.error("Environment variable validation failed:", result.error.format());
    // Safe default to prevent server crash
    parsedEnv = {
      AI_PROVIDER: "demo",
      NODE_ENV: "development",
    };
    return parsedEnv;
  }

  parsedEnv = result.data;
  return parsedEnv;
}
