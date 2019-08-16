import express from 'express';

import authRoutes from '../controllers/auth';

const router = express.Router();

router.post('/signup', authRoutes.signUp);
router.post('/signin', authRoutes.signIn);

module.exports = router;
