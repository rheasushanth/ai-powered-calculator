// API Request/Response Types
export interface CalculationRequest {
  expression?: string;
  naturalLanguageQuery?: string;
  includeSteps?: boolean;
  sessionId?: string;
}

export interface CalculationResponse {
  result: string;
  expression: string;
  steps?: string[];
  timestamp: string;
  executionTime: number;
  error?: string;
}

export interface NaturalLanguageRequest {
  query: string;
  context?: string;
  includeSteps?: boolean;
  sessionId?: string;
}

export interface LLMResponse {
  result: string;
  steps: Step[];
  formula_used: string;
  confidence: number;
  clarification_needed?: boolean;
  error?: string;
}

export interface Step {
  number: number;
  description: string;
  intermediate_value?: string;
}

export interface UnitConversionRequest {
  value: number;
  fromUnit: string;
  toUnit: string;
  category: 'length' | 'weight' | 'temperature' | 'currency';
}

export interface UnitConversionResponse {
  fromValue: number;
  fromUnit: string;
  toValue: number;
  toUnit: string;
  category: string;
  timestamp: string;
}

export interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
  timestamp: string;
  requestId?: string;
}

export interface HealthCheckResponse {
  status: 'ok' | 'degraded' | 'error';
  timestamp: string;
  services: {
    api: 'ok' | 'error';
    llm: 'ok' | 'error' | 'unconfigured';
    currency: 'ok' | 'error' | 'unconfigured';
  };
}

// Rate Limit Context
export interface RateLimitContext {
  userId?: string;
  sessionId?: string;
  ipAddress: string;
}
