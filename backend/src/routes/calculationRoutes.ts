import { Router } from 'express';
import {
  calculate,
  standardCalculate,
  naturalLanguageCalculate,
  getHistory,
  clearHistory,
} from '../controllers/calculationController';
import { validateCalculationRequest } from '../middleware/index';
import { asyncHandler } from '../middleware/index';

const router = Router();

/**
 * POST /api/calculate
 * Auto-detect and process either standard or natural language queries
 */
router.post('/calculate', validateCalculationRequest, asyncHandler(calculate));

/**
 * POST /api/calculate/standard
 * Process only standard mathematical expressions
 */
router.post('/calculate/standard', validateCalculationRequest, asyncHandler(standardCalculate));

/**
 * POST /api/calculate/natural-language
 * Process natural language math queries
 */
router.post('/calculate/natural-language', asyncHandler(naturalLanguageCalculate));

/**
 * GET /api/calculate/history
 * Get calculation history (requires session)
 */
router.get('/calculate/history', asyncHandler(getHistory));

/**
 * DELETE /api/calculate/history
 * Clear calculation history
 */
router.delete('/calculate/history', asyncHandler(clearHistory));

export default router;
