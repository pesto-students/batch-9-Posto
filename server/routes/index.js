const express = require('express');

const router = express.Router();
const usersRoutes = require('./users');
const postsRoutes = require('./posts');
const categoriesRoutes = require('./categories');

router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.use('/users', usersRoutes);
router.use('/posts', postsRoutes);
router.use('/categories', categoriesRoutes);

module.exports = router;
