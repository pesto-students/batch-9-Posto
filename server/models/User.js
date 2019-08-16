import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import config from '../config';

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    required: [true, 'First Name is required'],
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, 'Email is required'],
    index: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  profilePicUrl: {
    type: String,
    default: '',
  },
  verified: false,
  gender: {
    type: String,
    default: 'Male',
  },
  DOB: {
    type: Date,
    default: Date(),
  },
}, { timestamps: true });

// Hash the password before saving, pre save hook
UserSchema.pre('save', async function (next) {
  try {
    const pattern = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$');
    if (!pattern.test(this.password)) {
      return next(Error('Password requires at least 1 capital, 1 small, 1 number and 1 special character and should be at least 8 characters long'));
    }
    const hashedPassword = await bcrypt.hash(this.password, Number(config.BCRYPT_SALT_ROUNDS));
    this.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.methods.comparePassword = async function (candidatePassword, next) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    return next(error);
  }
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
