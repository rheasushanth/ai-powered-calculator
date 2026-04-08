import { Request, Response } from 'express';
import {
  processStandardCalculation,
  processNaturalLanguageQuery,
} from '../services/calculationService';
import { sendErrorResponse, sendSuccessResponse } from '../utils/errors';
import type { CalculationRequest } from '../types/index';

/**
 * Calculate - Handle both standard and natural language queries
 */
export async function calculate(req: Request, res: Response): Promise<void> {
  const requestId = (req as any).id;
  
  try {
    const { expression, naturalLanguageQuery, includeSteps } = req.body as CalculationRequest;

    let result;
    
    if (naturalLanguageQuery) {
      result = await processNaturalLanguageQuery(naturalLanguageQuery, includeSteps ?? true);
    } else if (expression) {
      result = await processStandardCalculation(expression, includeSteps ?? false);
    }

    sendSuccessResponse(res, 200, result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Calculation failed';
    console.error(`[${requestId}] Calculation error:`, error);
    sendErrorResponse(res, 400, message, requestId);
  }
}

/**
 * Standard Calculation - Only for mathematical expressions
 */
export async function standardCalculate(req: Request, res: Response): Promise<void> {
  const requestId = (req as any).id;
  
  try {
    const { expression, includeSteps } = req.body;

    const result = await processStandardCalculation(expression, includeSteps ?? false);
    sendSuccessResponse(res, 200, result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Calculation failed';
    console.error(`[${requestId}] Standard calculation error:`, error);
    sendErrorResponse(res, 400, message, requestId);
  }
}

/**
 * Natural Language Query
 */
export async function naturalLanguageCalculate(req: Request, res: Response): Promise<void> {
  const requestId = (req as any).id;
  
  try {
    const { query, includeSteps } = req.body;

    if (!query) {
      sendErrorResponse(res, 400, 'query parameter is required', requestId);
      return;
    }

    const result = await processNaturalLanguageQuery(query, includeSteps ?? true);
    sendSuccessResponse(res, 200, result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Query processing failed';
    console.error(`[${requestId}] NL calculation error:`, error);
    sendErrorResponse(res, 400, message, requestId);
  }
}

/**
 * Get calculation history - placeholder for future implementation
 */
export async function getHistory(_req: Request, res: Response): Promise<void> {
  // This would require session management and database
  const history = {
    items: [],
    total: 0,
    message: 'History management coming in v1.1',
  };

  sendSuccessResponse(res, 200, history);
}

/**
 * Clear session history - placeholder for future implementation
 */
export async function clearHistory(_req: Request, res: Response): Promise<void> {
  sendSuccessResponse(res, 200, { message: 'History cleared' });
}
