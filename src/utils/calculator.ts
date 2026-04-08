import * as math from 'mathjs';

/**
 * Evaluate a mathematical expression safely
 */
export function evaluateExpression(expression: string): string {
  try {
    // Remove any whitespace
    const cleanExpression = expression.trim();
    
    // Validate expression contains only allowed characters
    if (!/^[0-9+\-*/.()%\s]*$/.test(cleanExpression)) {
      throw new Error('Invalid characters in expression');
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
  // Handle special cases
  if (isNaN(num)) return 'Error';
  if (!isFinite(num)) return 'Infinity';
  
  // Format to 10 significant figures
  const formatted = parseFloat(num.toPrecision(10));
  
  // Remove trailing zeros after decimal point
  return formatted.toString().replace(/\.?0+$/, '');
}

/**
 * Parse a natural language calculation (basic version)
 * In production, this would be handled by the LLM
 */
export function parseNaturalLanguage(query: string): { 
  expression?: string; 
  error?: string;
} {
  // Basic pattern matching for common queries
  // This is a placeholder - real implementation uses LLM
  
  // Example: "what is 10 plus 5"
  const basicMath = query.match(/(\d+)\s*plus\s*(\d+)/i);
  if (basicMath) {
    return { expression: `${basicMath[1]}+${basicMath[2]}` };
  }
  
  return { error: 'Could not parse query. Please use standard calculator notation.' };
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
  steps.push(`Starting with: ${expression}`);
  
  try {
    const result = math.evaluate(expression);
    steps.push(`Result: ${formatNumber(result)}`);
  } catch {
    steps.push('Could not evaluate expression');
  }
  
  return steps;
}
