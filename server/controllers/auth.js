import User from '../models/User';
import {
  invalidResponse,
  destructorUserData,
  successfulResponse,
  getToken,
  passwordPatternCheck,
} from '../utils';

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

export {
  signIn,
  signUp,
};
