import { envSchema } from '@/schemas/env.schema';
import dotenv from 'dotenv';

dotenv.config();

export const env = envSchema.parse(process.env);
