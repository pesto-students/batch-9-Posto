import express from 'express';
import { signIn, signUp, forgotPassword } from '../controllers/auth';

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/forgot-password', forgotPassword);

export default router;
