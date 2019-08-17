import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    required: [true, 'Name is required'],
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
  profilePic: {
    type: String,
    default: '',
  },
  gender: {
    type: String,
    default: 'Male',
  },
  DOB: {
    type: Date,
    default: Date(),
  },
}, { timestamps: true });

UserSchema.pre('save', async function savePassword(next) {
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});

// eslint-disable-next-line consistent-return
UserSchema.methods.comparePassword = async function compare(candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    return false;
  }
};

UserSchema.plugin(uniqueValidator, { message: 'is already taken.' });

const User = mongoose.model('User', UserSchema);

export default User;
