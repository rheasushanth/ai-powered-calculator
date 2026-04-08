import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { sendErrorResponse } from '../utils/errors';

/**
 * Request ID middleware - adds unique ID to each request
 */
export function requestIdMiddleware(req: Request, _res: Response, next: NextFunction): void {
  (req as any).id = uuidv4();
  next();
}

/**
 * Error handling middleware
 */
export function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction): void {
  const requestId = (req as any).id;
  
  console.error(`[${requestId}] Error:`, err);

  if (err instanceof SyntaxError && 'body' in err) {
    sendErrorResponse(res, 400, 'Invalid JSON', requestId);
    return;
  }

  sendErrorResponse(res, 500, 'Internal server error', requestId);
}

/**
 * Async error wrapper for route handlers
 */
export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>,
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

/**
 * Request validation middleware
 */
export function validateCalculationRequest(req: Request, res: Response, next: NextFunction): void {
  const { expression, naturalLanguageQuery, includeSteps } = req.body;

  if (!expression && !naturalLanguageQuery) {
    sendErrorResponse(res, 400, 'Either expression or naturalLanguageQuery is required');
    return;
  }

  if (expression && typeof expression !== 'string') {
    sendErrorResponse(res, 400, 'expression must be a string');
    return;
  }

  if (naturalLanguageQuery && typeof naturalLanguageQuery !== 'string') {
    sendErrorResponse(res, 400, 'naturalLanguageQuery must be a string');
    return;
  }

  if (includeSteps !== undefined && typeof includeSteps !== 'boolean') {
    sendErrorResponse(res, 400, 'includeSteps must be a boolean');
    return;
  }

  next();
}

/**
 * Validate conversion request
 */
export function validateConversionRequest(req: Request, res: Response, next: NextFunction): void {
  const { value, fromUnit, toUnit, category } = req.body;

  if (value === undefined || typeof value !== 'number') {
    sendErrorResponse(res, 400, 'value must be a number');
    return;
  }

  if (!fromUnit || typeof fromUnit !== 'string') {
    sendErrorResponse(res, 400, 'fromUnit must be a string');
    return;
  }

  if (!toUnit || typeof toUnit !== 'string') {
    sendErrorResponse(res, 400, 'toUnit must be a string');
    return;
  }

  if (!category || typeof category !== 'string') {
    sendErrorResponse(res, 400, 'category must be a string');
    return;
  }

  const validCategories = ['length', 'weight', 'temperature', 'currency'];
  if (!validCategories.includes(category.toLowerCase())) {
    sendErrorResponse(res, 400, `category must be one of: ${validCategories.join(', ')}`);
    return;
  }

  next();
}

/**
 * Logging middleware
 */
export function loggingMiddleware(req: Request, res: Response, next: NextFunction): void {
  const requestId = (req as any).id;
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(
      `[${requestId}] ${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`,
    );
  });

  next();
}
