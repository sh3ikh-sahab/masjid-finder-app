import express from 'express';
import { getNearbyMosquesHandler, updateMosqueTimingsHandler, getMosquesWithTimingsHandler } from '../controllers/mosqueController.js';

const router = express.Router();

router.get('/nearby', getNearbyMosquesHandler);
router.put('/update-timings', updateMosqueTimingsHandler);
router.get('/with-timings', getMosquesWithTimingsHandler);

export default router;
