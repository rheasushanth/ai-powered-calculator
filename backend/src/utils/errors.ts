import { Response } from 'express';
import type { ErrorResponse } from '../types/index';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public isOperational: boolean = true,
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export function handleError(error: unknown): { statusCode: number; message: string } {
  if (error instanceof AppError) {
    return {
      statusCode: error.statusCode,
      message: error.message,
    };
  }

  if (error instanceof Error) {
    return {
      statusCode: 500,
      message: error.message,
    };
  }

  return {
    statusCode: 500,
    message: 'Internal server error',
  };
}

export function sendErrorResponse(res: Response, statusCode: number, message: string, requestId?: string): void {
  const errorResponse: ErrorResponse = {
    error: 'Error',
    message,
    statusCode,
    timestamp: new Date().toISOString(),
    requestId,
  };
  
  res.status(statusCode).json(errorResponse);
}

export function sendSuccessResponse<T>(res: Response, statusCode: number, data: T): void {
  res.status(statusCode).json({
    success: true,
    data,
    timestamp: new Date().toISOString(),
  });
}
