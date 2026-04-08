import express, { Request, Response } from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import config from './config';
import calculationRoutes from './routes/calculationRoutes';
import conversionRoutes from './routes/conversionRoutes';
import healthRoutes from './routes/healthRoutes';
import {
  requestIdMiddleware,
  loggingMiddleware,
  errorHandler,
} from './middleware/index';

const app = express();

// Middleware
app.use(express.json({ limit: '10kb' }));
app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true,
  }),
);

// Request tracking
app.use(requestIdMiddleware);
app.use(loggingMiddleware);

// Rate limiting
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.maxRequests,
  message: 'Too many requests, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

const aiLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.maxAIRequests,
  message: 'Too many AI requests, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting
app.use('/api/', limiter);
app.use('/api/calculate/natural-language', aiLimiter);

// Routes
app.use('/api/', healthRoutes);
app.use('/api/', calculationRoutes);
app.use('/api/', conversionRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.path}`,
    timestamp: new Date().toISOString(),
  });
});

// Error handler (must be last)
app.use(errorHandler);

// Start server
const PORT = config.port;

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
  console.log(`📊 Environment: ${config.nodeEnv}`);
  console.log(`🤖 LLM Provider: ${config.llm.provider} (${config.llm.apiKey ? 'configured' : 'not configured'})`);
});

export default app;
