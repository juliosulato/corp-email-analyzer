import express from 'express';
import path from 'path';
import rateLimit from 'express-rate-limit';
import { env } from '@/config/env';
import cors from 'cors';
import emailRoutes from '@/routes/email.routes';
import { errorHandler } from '@/middleware/errorHandler';

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Servir arquivos estáticos (Frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: env.NODE_ENV === 'production' ? 100 : 1000,
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
  });
});

// API Routes
app.use(`${env.API_PREFIX}/emails`, emailRoutes);

// Serve index.html para qualquer rota não-API (SPA fallback)
// Express 5.x usa wildcards diferentes
app.use((req, res, next) => {
  // Se é rota de API, passa para o próximo handler
  if (req.path.startsWith('/api') || req.path === '/health') {
    return next();
  }
  
  // Caso contrário, serve o index.html
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handler (deve ser o último middleware)
app.use(errorHandler);

export default app;