import { Router } from 'express';
import { getById, getAllFilteredPhotos } from '../controllers/photoController';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

// Route to get a single enriched photo by ID
router.get('/:id', asyncHandler(getById));

// Route to get filtered photos based on query parameters
router.get('/',  asyncHandler(getAllFilteredPhotos));

export default router;