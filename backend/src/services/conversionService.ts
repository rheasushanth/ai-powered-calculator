import type { UnitConversionResponse } from '../types/index';

const conversionFactors: Record<string, Record<string, number>> = {
  length: {
    mm: 0.001,
    cm: 0.01,
    m: 1,
    km: 1000,
    inch: 0.0254,
    ft: 0.3048,
    yard: 0.9144,
    mile: 1609.34,
  },
  weight: {
    mg: 0.001,
    g: 1,
    kg: 1000,
    oz: 28.3495,
    lb: 453.592,
    ton: 1000000,
  },
  temperature: {
    celsius: 1,
    fahrenheit: 1,
    kelvin: 1,
  },
};

/**
 * Convert between different units
 */
export function convertUnits(
  value: number,
  fromUnit: string,
  toUnit: string,
  category: 'length' | 'weight' | 'temperature' | 'currency',
): UnitConversionResponse {
  const categoryLower = category.toLowerCase();

  if (!conversionFactors[categoryLower]) {
    throw new Error(`Unknown category: ${category}`);
  }

  const factors = conversionFactors[categoryLower];

  if (!factors[fromUnit.toLowerCase()] || !factors[toUnit.toLowerCase()]) {
    throw new Error(`Unknown unit: ${fromUnit} or ${toUnit} for ${category}`);
  }

  let convertedValue: number;

  if (category === 'temperature') {
    convertedValue = convertTemperature(value, fromUnit, toUnit);
  } else {
    // Convert to base unit then to target unit
    const baseValue = value * factors[fromUnit.toLowerCase()];
    convertedValue = baseValue / factors[toUnit.toLowerCase()];
  }

  return {
    fromValue: value,
    fromUnit,
    toValue: convertedValue,
    toUnit,
    category: category,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Special temperature conversion logic
 */
function convertTemperature(value: number, from: string, to: string): number {
  const fromLower = from.toLowerCase();
  const toLower = to.toLowerCase();

  // Convert to Celsius first
  let celsius: number;

  if (fromLower === 'celsius') {
    celsius = value;
  } else if (fromLower === 'fahrenheit') {
    celsius = (value - 32) * (5 / 9);
  } else if (fromLower === 'kelvin') {
    celsius = value - 273.15;
  } else {
    throw new Error(`Unknown temperature unit: ${from}`);
  }

  // Convert from Celsius to target
  if (toLower === 'celsius') {
    return celsius;
  } else if (toLower === 'fahrenheit') {
    return celsius * (9 / 5) + 32;
  } else if (toLower === 'kelvin') {
    return celsius + 273.15;
  } else {
    throw new Error(`Unknown temperature unit: ${to}`);
  }
}

/**
 * Get available units for a category
 */
export function getUnitsForCategory(category: string): string[] {
  return Object.keys(conversionFactors[category] || {});
}

/**
 * Validate unit conversion request
 */
export function isValidConversionRequest(
  category: string,
  fromUnit: string,
  toUnit: string,
): boolean {
  const validCategories = Object.keys(conversionFactors);
  if (!validCategories.includes(category)) {
    return false;
  }

  const units = getUnitsForCategory(category);
  return units.includes(fromUnit.toLowerCase()) && units.includes(toUnit.toLowerCase());
}
