import * as math from 'mathjs';

/**
 * Evaluate a mathematical expression safely
 */
export function evaluateExpression(expression: string): string {
  try {
    const cleanExpression = expression.trim();
    
    // Validate expression contains only allowed characters
    if (!/^[0-9+\-*/.()%\s^√∛]*$/.test(cleanExpression)) {
      throw new Error('Invalid characters in expression');
    }
    
    // Check for suspicious patterns
    if (cleanExpression.includes('__proto__') || cleanExpression.includes('constructor')) {
      throw new Error('Invalid expression');
    }
    
    const result = math.evaluate(cleanExpression);
    
    // Format the result to avoid floating point precision issues
    return formatNumber(result);
  } catch (error) {
    throw new Error(`Invalid expression: ${expression}`);
  }
}

/**
 * Format a number with appropriate decimal places
 */
export function formatNumber(num: number): string {
  if (isNaN(num)) return 'Error';
  if (!isFinite(num)) return 'Infinity';
  
  // Format to 10 significant figures
  const formatted = parseFloat(num.toPrecision(10));
  
  // Remove trailing zeros after decimal point
  return formatted.toString().replace(/\.?0+$/, '');
}

/**
 * Validate if a string is a valid mathematical expression
 */
export function isValidExpression(expression: string): boolean {
  try {
    math.parse(expression);
    return true;
  } catch {
    return false;
  }
}

/**
 * Generate calculation steps for simple expressions
 */
export function generateSteps(expression: string): string[] {
  const steps: string[] = [];
  steps.push(`Expression: ${expression}`);
  
  try {
    const result = math.evaluate(expression);
    steps.push(`Result: ${formatNumber(result)}`);
  } catch {
    steps.push('Could not evaluate expression');
  }
  
  return steps;
}

/**
 * Parse mathematical expression into components
 */
export interface ExpressionComponents {
  operands: number[];
  operators: string[];
  isValid: boolean;
}

export function parseExpression(expression: string): ExpressionComponents {
  try {
    math.parse(expression);
    return {
      operands: [],
      operators: [],
      isValid: true,
    };
  } catch {
    return {
      operands: [],
      operators: [],
      isValid: false,
    };
  }
}
