import express from 'express';
import rateLimit from 'express-rate-limit';
import { env } from '@/config/env';
import cors from 'cors';
import emailRoutes from '@/routes/email.routes';
import { errorHandler } from '@/middleware/errorHandler';

const app = express( );

app.use(express.json());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb' }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: env.NODE_ENV === 'production' ? 100 : 1000,
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

app.get(`${env.API_PREFIX}/health`, (req, res) => {
  res.json({ status: 'OK' });
});

app.use(`${env.API_PREFIX}/emails`, emailRoutes);

app.use(errorHandler);

export default app;
