import Joi from '@hapi/joi';
import { ObjectId } from 'mongodb';
import User from '../models/User';

import UserSchema from '../validations/users';
import joiOptions from '../validations/joiOptions';

async function getUser(req, res) {
  try {
    const { userId } = req.params;
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: 'Invalid user id value' });
    }
    const user = await User.findById(userId).select('name email profilePic gender DOB').lean();
    if (user) {
      return res.status(200).json({ success: true, message: 'User found', user });
    }
    return res.status(200).json({ success: false, message: 'User not found' });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
}

const updateUser = async function updateUser(req, res) {
  try {
    const { userId } = req.params;
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: 'Invalid user id value' });
    }
    const { body } = req;
    await Joi.validate(body, UserSchema, joiOptions);
    const updatedUser = await User.findByIdAndUpdate(userId, body, { new: true, select: 'name email profilePic gender DOB' }).lean();
    if (updatedUser) {
      return res.status(200).json({ success: true, message: 'User updated successfully', updatedUser });
    }
    return res.status(200).json({ success: false, message: 'User could not be updated' });
  } catch (error) {
    const errorResponse = { success: false, message: 'Could not update user', isJoi: !!error.isJoi };
    if (error.isJoi) {
      errorResponse.error = error.details;
    }
    return res.status(400).json(errorResponse);
  }
};

module.exports = {
  getUser,
  updateUser,
};
