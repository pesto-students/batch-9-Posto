import Joi from '@hapi/joi';
import joiOptions from '../validations/joiOptions';
import User from '../models/User';
import { sendMail } from '../helpers/mail';
import { ForgotPasswordSchema, ResetPasswordSchema } from '../validations/auth';
import config from '../config';
import {
  invalidResponse,
  destructorUserData,
  successfulResponse,
  getToken,
  passwordPatternCheck,
} from '../utils';
import generateToken from '../helpers/tokenGenerator';

const signIn = async (request, response) => {
  try {
    const user = await User.findOne({
      email: request.body.email,
    });
    const isMatch = await user.comparePassword(request.body.password);
    if (isMatch) {
      const userData = destructorUserData(user);
      const token = getToken(userData);
      return successfulResponse(response, 200, 'Sign-in successful', userData, token);
    }
    return invalidResponse(response, 400, 'Invalid Email/Password.');
  } catch (error) {
    return invalidResponse(response, 400, 'Email not found, Please sign-up first.');
  }
};

const signUp = async (request, response) => {
  try {
    const result = passwordPatternCheck(request.body.password);
    if (!result) {
      return invalidResponse(response, 400, 'Password should contain at least 1 capital, 1 small, 1 special character, and 1 number and should be minimum 8 characters in length');
    }
    const user = await User.create(request.body);
    const userData = destructorUserData(user);
    const token = getToken(userData);
    if (token) {
      await sendMail({
        type: 'welcome',
        mailOptions: { to: user.email, subject: 'Welcome to Posto!' },
        variables: { name: user.name },
      });
      return successfulResponse(response, 201, 'Sign-up successful', userData, token);
    }
    return invalidResponse(response, 500, 'Token could not be created');
  } catch (error) {
    if (error.name === 'ValidationError') {
      return invalidResponse(response, 400, 'Email already exists, Please Login');
    }
    return invalidResponse(response, 500, 'Some internal error occurred');
  }
};

const forgotPassword = async (request, response) => {
  try {
    await Joi.validate(request.body, ForgotPasswordSchema, joiOptions);
    const currentTime = new Date();
    const expiryTime = (new Date(currentTime.getTime() + 1000 * 600)).valueOf();
    const token = { value: generateToken(), expires: expiryTime };
    const user = await User.findOneAndUpdate({ email: request.body.email }, { token }).select('name email');
    if (user) {
      await sendMail({
        type: 'forgot-password',
        mailOptions: { to: user.email, subject: 'Forgot Password' },
        variables: { name: user.name, resetLink: `${config.BLOG_URL}reset-password?token=${token.value}` },
      });
    }
    return response.status(200).json({ success: true, message: 'Please check your email for the reset password instructions' });
  } catch (error) {
    return response.status(400).json({ success: false, message: 'Some internal error occurred', error });
  }
};

const resetPassword = async (request, response) => {
  try {
    await Joi.validate(request.body, ResetPasswordSchema, joiOptions);
    const { token, newPassword } = request.body;
    const currentTime = (new Date()).valueOf();
    const user = await User.findOne(
      {
        $and: [
          { 'token.value': token },
          { 'token.expires': { $gte: currentTime } },
        ],
      },
    ).lean();
    if (!user) {
      return response.status(400).json({ success: false, message: 'Token has expired' });
    }
    await User.updateOne({ 'token.value': token }, { password: newPassword, $unset: { token: '' } }).lean();
    return response.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    const errorResponse = { success: false, message: 'Could not reset password', isJoi: Boolean(error.isJoi) };
    if (error.isJoi) {
      errorResponse.error = error.details;
    }
    return response.status(400).json(errorResponse);
  }
};

export {
  signIn,
  signUp,
  forgotPassword,
  resetPassword,
};
