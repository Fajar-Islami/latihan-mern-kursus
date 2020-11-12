import express from 'express';

import { authUser, getUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile);
// klo request get pakai route

export default router;
