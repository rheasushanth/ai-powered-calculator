import { generateSteps, evaluateExpression } from '../utils/calculator';
import { callLLM, isLLMAvailable } from './llmService';
import type { CalculationResponse } from '../types/index';

/**
 * Process a standard mathematical calculation
 */
export async function processStandardCalculation(
  expression: string,
  includeSteps: boolean = false,
): Promise<CalculationResponse> {
  const startTime = Date.now();

  try {
    const result = evaluateExpression(expression);
    const executionTime = Date.now() - startTime;

    const response: CalculationResponse = {
      result,
      expression,
      timestamp: new Date().toISOString(),
      executionTime,
    };

    if (includeSteps) {
      response.steps = generateSteps(expression);
    }

    return response;
  } catch (error) {
    const executionTime = Date.now() - startTime;
    throw {
      error: 'Calculation Error',
      message: error instanceof Error ? error.message : 'Failed to evaluate expression',
      timestamp: new Date().toISOString(),
      executionTime,
    };
  }
}

/**
 * Process a natural language query using LLM
 */
export async function processNaturalLanguageQuery(
  query: string,
  includeSteps: boolean = true,
): Promise<CalculationResponse> {
  const startTime = Date.now();

  try {
    // Check if LLM is available
    const llmAvailable = await isLLMAvailable();
    
    if (!llmAvailable) {
      throw new Error('LLM service is not configured. Please set LLM_API_KEY environment variable.');
    }

    // Call LLM to process the query
    const llmResponse = await callLLM(query);

    // Validate LLM response
    if (!llmResponse.result) {
      throw new Error('Invalid response from LLM');
    }

    // Cross-validate the result if it's a numeric value
    if (typeof llmResponse.result === 'string' && !isNaN(parseFloat(llmResponse.result))) {
      try {
        // Try to verify the result is reasonable
        const parsedResult = parseFloat(llmResponse.result);
        if (!isFinite(parsedResult)) {
          throw new Error('Invalid numeric result');
        }
      } catch {
        throw new Error('LLM returned an invalid numeric result');
      }
    }

    const executionTime = Date.now() - startTime;

    const response: CalculationResponse = {
      result: llmResponse.result,
      expression: query,
      timestamp: new Date().toISOString(),
      executionTime,
    };

    if (includeSteps && llmResponse.steps) {
      response.steps = llmResponse.steps.map((step) => 
        typeof step === 'string' ? step : step.description
      );
    }

    return response;
  } catch (error) {
    const executionTime = Date.now() - startTime;
    throw {
      error: 'Natural Language Processing Error',
      message: error instanceof Error ? error.message : 'Failed to process query',
      timestamp: new Date().toISOString(),
      executionTime,
    };
  }
}

/**
 * Determine if a query is natural language or mathematical expression
 */
export function isNaturalLanguageQuery(input: string): boolean {
  // If input contains words/letters that aren't part of math syntax, treat as NL
  const mathematicalKeywords = /^[\d+\-*/.()%\s^√∛=]*$/;
  return !mathematicalKeywords.test(input);
}

/**
 * Process any calculation (auto-detect type)
 */
export async function processCalculation(
  input: string,
  includeSteps: boolean = false,
): Promise<CalculationResponse> {
  if (isNaturalLanguageQuery(input)) {
    return processNaturalLanguageQuery(input, includeSteps);
  }

  return processStandardCalculation(input, includeSteps);
}
