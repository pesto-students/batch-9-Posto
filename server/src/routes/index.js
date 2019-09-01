import express from 'express';
import usersRoutes from './users';
import postsRoutes from './posts';
import categoriesRoutes from './categories';
import authRoutes from './auth';
import { loginRequired } from '../middleware/auth';

const router = express.Router();
router.get('/', loginRequired, (req, res) => {
  res.status(200).json({ success: true, message: '' });
});

router.use('/auth', authRoutes);
router.use('/users', loginRequired, usersRoutes);
router.use('/posts', loginRequired, postsRoutes);
router.use('/categories', loginRequired, categoriesRoutes);

export default router;
