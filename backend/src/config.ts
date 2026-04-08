import 'dotenv/config';

export const config = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  
  // LLM Configuration
  llm: {
    provider: (process.env.LLM_PROVIDER || 'claude') as 'claude' | 'openai',
    apiKey: process.env.LLM_API_KEY || '',
    model: process.env.LLM_MODEL || 'claude-3.5-sonnet-20241022',
    timeout: parseInt(process.env.LLM_TIMEOUT || '10000', 10),
  },
  
  // Currency API
  currencyApi: {
    endpoint: process.env.CURRENCY_API_ENDPOINT || 'https://api.exchangerate-api.com/v4/latest',
    cacheDuration: parseInt(process.env.CURRENCY_CACHE_DURATION || '3600', 10), // 1 hour
  },
  
  // Rate Limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || '900000', 10), // 15 minutes
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
    maxAIRequests: parseInt(process.env.AI_RATE_LIMIT_MAX || '200', 10), // free tier
  },
  
  // Logging
  logging: {
    level: process.env.LOG_LEVEL || 'info',
  },
};

export default config;
