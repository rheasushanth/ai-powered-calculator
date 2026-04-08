// Calculator state types
export interface CalculatorState {
  display: string;
  previousValue: string;
  operation: string | null;
  waitingForNewValue: boolean;
  history: CalculationHistory[];
}

// Calculation history
export interface CalculationHistory {
  id: string;
  expression: string;
  result: string;
  timestamp: Date;
  type: 'standard' | 'natural_language';
}

// LLM Response types
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

// Unit conversion types
export interface ConversionResult {
  fromValue: number;
  fromUnit: string;
  toValue: number;
  toUnit: string;
  category: 'length' | 'weight' | 'temperature' | 'currency';
}

// Settings
export interface UserSettings {
  theme: 'light' | 'dark';
  preferredUnits: string;
  showStepsByDefault: boolean;
  language: string;
  autoSave: boolean;
}
