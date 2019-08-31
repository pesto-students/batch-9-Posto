import express from 'express';
import {
  signIn, signUp, forgotPassword, resetPassword,
} from '../controllers/auth';

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;
