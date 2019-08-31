import express from 'express';
import UserController from '../controllers/users';
import verifyValidObjectId from '../middleware/validObjectId';

const router = express.Router();

router.get('/:userId', verifyValidObjectId, UserController.getUser);

router.put('/:userId', verifyValidObjectId, UserController.updateUser);

router.delete('/:userId', (req, res) => {
  res.status(200).json({ success: true, message: '' });
});

module.exports = router;
