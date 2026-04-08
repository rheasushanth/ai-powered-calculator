import { Request, Response } from 'express';
import { convertUnits, getUnitsForCategory, isValidConversionRequest } from '../services/conversionService';
import { sendErrorResponse, sendSuccessResponse } from '../utils/errors';
import type { UnitConversionRequest } from '../types/index';

/**
 * Convert units
 */
export async function convert(req: Request, res: Response): Promise<void> {
  const requestId = (req as any).id;
  
  try {
    const { value, fromUnit, toUnit, category } = req.body as UnitConversionRequest;

    // Validate the conversion request
    if (!isValidConversionRequest(category, fromUnit, toUnit)) {
      sendErrorResponse(
        res,
        400,
        `Invalid conversion: cannot convert from ${fromUnit} to ${toUnit} in ${category}`,
        requestId,
      );
      return;
    }

    // Validate value
    if (!isFinite(value)) {
      sendErrorResponse(res, 400, 'value must be a valid number', requestId);
      return;
    }

    const result = convertUnits(value, fromUnit, toUnit, category);
    sendSuccessResponse(res, 200, result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Conversion failed';
    console.error(`[${requestId}] Conversion error:`, error);
    sendErrorResponse(res, 400, message, requestId);
  }
}

/**
 * Get available units for a category
 */
export async function getUnits(req: Request, res: Response): Promise<void> {
  const requestId = (req as any).id;
  
  try {
    const { category } = req.params;

    if (!category) {
      sendErrorResponse(res, 400, 'category parameter is required', requestId);
      return;
    }

    const validCategories = ['length', 'weight', 'temperature', 'currency'];
    if (!validCategories.includes(category.toLowerCase())) {
      sendErrorResponse(
        res,
        400,
        `Invalid category. Must be one of: ${validCategories.join(', ')}`,
        requestId,
      );
      return;
    }

    const units = getUnitsForCategory(category);
    
    if (units.length === 0) {
      sendErrorResponse(res, 404, `No units available for category: ${category}`, requestId);
      return;
    }

    sendSuccessResponse(res, 200, {
      category,
      units,
      count: units.length,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to retrieve units';
    console.error(`[${requestId}] Get units error:`, error);
    sendErrorResponse(res, 400, message, requestId);
  }
}

/**
 * Get all supported categories
 */
export async function getCategories(_req: Request, res: Response): Promise<void> {
  const categories = [
    {
      name: 'length',
      description: 'Convert between length units (mm, cm, m, km, inch, ft, yard, mile)',
    },
    {
      name: 'weight',
      description: 'Convert between weight units (mg, g, kg, oz, lb, ton)',
    },
    {
      name: 'temperature',
      description: 'Convert between temperature units (celsius, fahrenheit, kelvin)',
    },
    {
      name: 'currency',
      description: 'Convert between currencies (requires live API, coming in v1.1)',
    },
  ];

  sendSuccessResponse(res, 200, {
    categories,
    total: categories.length,
  });
}
