import express from 'express';
import UserController from '../controllers/users';

const router = express.Router();

router.get('/:userId', UserController.getUser);

router.put('/:userId', UserController.updateUser);

router.delete('/:userId', (req, res) => {
  res.status(200).json({ success: true, message: '' });
});

module.exports = router;
