import { ObjectId } from 'mongodb';
import User from '../models/User';

async function getUser(req, res) {
  try {
    const { userId } = req.params;
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: 'Invalid user id value' });
    }
    const user = await User.findById(userId).select('name email profilePic gender DOB');
    if (user) {
      return res.status(200).json({ success: true, message: 'User found', user });
    }
    return res.status(200).json({ success: false, message: 'User not found' });
  } catch (error) {
    return res.json(400).json({ success: false, message: error.message });
  }
}

module.exports = {
  getUser,
};
