import express from 'express';
import usersRoutes from './users';
import postsRoutes from './posts';
import categoriesRoutes from './categories';
import authRoutes from './auth';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ success: true, message: '' });
});
router.use('/users', usersRoutes);
router.use('/posts', postsRoutes);
router.use('/categories', categoriesRoutes);
router.use('/auth', authRoutes);

module.exports = router;
