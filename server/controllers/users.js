import { ObjectID } from 'mongodb';
import User from '../models/User';

async function getUser(req, res) {
  try {
    const userId = ObjectID(req.params.userId);
    const user = await User.findById(userId);
    if (user) {
      return res.status(200).json({ success: true, message: 'user found', user });
    }
    return res.status(200).json({ success: false, message: 'user not found', user });
  } catch (error) {
    return res.json(400).json({ success: false, message: error.message });
  }
}

module.exports = {
  getUser,
};
