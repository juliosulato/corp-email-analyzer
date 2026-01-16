import { z } from "zod";

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  OPENAI_API_KEY: z.string().min(1, 'OPENAI_API_KEY is required'),
  API_PREFIX: z.string().default('/api'),
  PORT: z.coerce.number().default(3000),
});