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
router.use('/users', usersRoutes);
router.use('/posts', postsRoutes);
router.use('/categories', categoriesRoutes);

export default router;
