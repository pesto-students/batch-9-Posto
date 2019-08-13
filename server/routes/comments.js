const express = require('express');

const router = express.Router();
const replies = require('./replies');

router.get('/', (req, res) => {
  res.status(200).json({ success: true, message: '' });
});

router.get('/:commentId', (req, res) => {
  res.status(200).json({ success: true, message: '' });
});

router.post('/', (req, res) => {
  res.status(200).json({ success: true, message: '' });
});

router.put('/:commentId', (req, res) => {
  res.status(200).json({ success: true, message: '' });
});

router.delete('/:commentId', (req, res) => {
  res.status(200).json({ success: true, message: '' });
});


router.use('/:commentId/replies', replies);


module.exports = router;
