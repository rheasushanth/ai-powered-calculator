import { Request, Response } from 'express';
import { isLLMAvailable } from '../services/llmService';
import { sendSuccessResponse } from '../utils/errors';
import type { HealthCheckResponse } from '../types/index';

/**
 * Health check endpoint
 */
export async function healthCheck(_req: Request, res: Response): Promise<void> {
  try {
    const llmAvailable = await isLLMAvailable();

    const health: HealthCheckResponse = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        api: 'ok',
        llm: llmAvailable ? 'ok' : 'unconfigured',
        currency: 'unconfigured', // Will be implemented in v1.1
      },
    };

    // Set status to degraded if LLM is not available
    if (!llmAvailable) {
      health.status = 'degraded';
    }

    const statusCode = health.status === 'ok' ? 200 : 503;
    sendSuccessResponse(res, statusCode, health);
  } catch (error) {
    const health: HealthCheckResponse = {
      status: 'error',
      timestamp: new Date().toISOString(),
      services: {
        api: 'error',
        llm: 'error',
        currency: 'error',
      },
    };

    sendSuccessResponse(res, 500, health);
  }
}

/**
 * Get API version and info
 */
export async function getInfo(_req: Request, res: Response): Promise<void> {
  sendSuccessResponse(res, 200, {
    name: 'AI-Powered Calculator Backend',
    version: '0.0.0',
    description: 'Backend API for AI-powered calculator with LLM integration',
    status: 'development',
    targetLaunch: 'Q3 2026',
    endpoints: {
      calculate: '/api/calculate',
      standardCalc: '/api/calculate/standard',
      naturalLanguage: '/api/calculate/natural-language',
      convert: '/api/convert',
      getUnits: '/api/convert/units/:category',
      getCategories: '/api/convert/categories',
      health: '/api/health',
    },
  });
}
