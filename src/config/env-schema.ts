import dotEnv from 'dotenv';
import { z } from 'zod';

const envSchema = z.object({
  DEBUG: z
    .string()
    .transform((s) => s.toLowerCase())
    .refine((s) => s === 'true' || s === 'false')
    .transform((s) => s === 'true'),
  PORT: z.coerce.number(),
  DB_PASSWORD: z.string(),
  DB_USER: z.string(),
  DB_PORT: z.coerce.number(),
  DB_DATABASE: z.string(),
});
export const env = (() => {
  dotEnv.config();
  return envSchema.parse(process.env);
})();
