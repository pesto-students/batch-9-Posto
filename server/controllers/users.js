import Joi from '@hapi/joi';
import User from '../models/User';
import imageHelper from '../helpers/images';

import UserSchema from '../validations/users';
import joiOptions from '../validations/joiOptions';

async function getUser(req, res) {
  try {
    const { userId } = req.params;
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

const updateProfilePic = async function updateProfilePic(req, res) {
  try {
    const { userId } = req.params;
    const upload = await imageHelper.uploadImage('profile');
    await upload(req, res);
    const { path } = req.file;
    const uniqueFilename = new Date().toISOString();
    const image = await imageHelper.uploadImageToCloudinary(path, uniqueFilename);
    await imageHelper.removeImage(path);
    const imagePath = `${image.public_id}.${image.format}`;
    const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: imagePath }).lean();
    if (updatedUser) {
      return res.status(200).json({ success: true, profilePicUrl: imagePath, message: 'Profile pic uploaded successfully' });
    }
    return res.status(400).json({ success: false, message: 'Could not update profile pic' });
  } catch (error) {
    return res.status(400).json({ success: false, message: 'Could not update profile pic', error: error.message });
  }
};

module.exports = {
  getUser,
  updateUser,
  updateProfilePic,
};
