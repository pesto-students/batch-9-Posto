import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: {
    type: String,
    lowercase: true,
    required: [true, 'First Name is required'],
  },
  lastName: {
    type: String,
    lowercase: true,
    required: [true, 'Last Name is required'],
  },
  authToken: String,
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, 'Email is required'],
    index: true,
  },
  profilePic: String,

}, { timestamps: true });

UserSchema.plugin(uniqueValidator, { message: 'is already taken.' });

module.exports = mongoose.model('User', UserSchema);
