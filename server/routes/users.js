const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ success: true, message: '' });
});

router.get('/:userId', (req, res) => {
  res.status(200).json({ success: true, message: '' });
});

router.post('/', (req, res) => {
  res.status(200).json({ success: true, message: '' });
});

router.put('/:userId', (req, res) => {
  res.status(200).json({ success: true, message: '' });
});

router.delete('/:userId', (req, res) => {
  res.status(200).json({ success: true, message: '' });
});

module.exports = router;
