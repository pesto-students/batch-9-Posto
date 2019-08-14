import express from 'express';
import comments from './comments';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ success: true, message: '' });
});

router.get('/:postId', (req, res) => {
  res.status(200).json({ success: true, message: '' });
});

router.post('/', (req, res) => {
  res.status(200).json({ success: true, message: '' });
});

router.put('/:postId', (req, res) => {
  res.status(200).json({ success: true, message: '' });
});

router.delete('/:postId', (req, res) => {
  res.status(200).json({ success: true, message: '' });
});

router.use('/:postId/comments', comments);

module.exports = router;
