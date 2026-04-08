import { Router } from 'express';
import {
  convert,
  getUnits,
  getCategories,
} from '../controllers/conversionController';
import { validateConversionRequest } from '../middleware/index';
import { asyncHandler } from '../middleware/index';

const router = Router();

/**
 * POST /api/convert
 * Convert between units
 */
router.post('/convert', validateConversionRequest, asyncHandler(convert));

/**
 * GET /api/convert/categories
 * Get all supported conversion categories
 */
router.get('/convert/categories', asyncHandler(getCategories));

/**
 * GET /api/convert/units/:category
 * Get available units for a specific category
 */
router.get('/convert/units/:category', asyncHandler(getUnits));

export default router;
