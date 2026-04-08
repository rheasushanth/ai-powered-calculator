import { Router } from 'express';
import { healthCheck, getInfo } from '../controllers/healthController';
import { asyncHandler } from '../middleware/index';

const router = Router();

/**
 * GET /api/health
 * Health check endpoint
 */
router.get('/health', asyncHandler(healthCheck));

/**
 * GET /api/info
 * Get API information
 */
router.get('/info', asyncHandler(getInfo));

export default router;
