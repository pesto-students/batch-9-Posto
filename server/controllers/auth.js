import jwt from 'jsonwebtoken';

import config from '../config';
import db from '../models';

function generateToken(userObject) {
  return jwt.sign(userObject, config.JWT_SECRET_KEY);
}

exports.signIn = async function (request, response, next) {
  try {
    // find user
    const user = await db.User.findOne({
      email: request.body.email,
    });
    const {
      id, name, email, profilePicUrl, verified, gender, DOB,
    } = user;
    const userData = {
      id, name, email, profilePicUrl, verified, gender, DOB,
    };
    // compare passwords
    const isMatch = await user.comparePassword(request.body.password);
    if (isMatch) {
      // generate JWT
      const token = generateToken(userData);
      return response.status(200).json({
        ...userData, token,
      });
    }
    throw new Error();
  } catch (error) {
    return next({
      status: 400,
      message: 'Invalid email/password',
    });
  }
};

exports.signUp = async function (request, response, next) {
  // create a user
  try {
    const user = await db.User.create(request.body);
    const {
      id, name, email, profilePicUrl, verified, gender, DOB,
    } = user;
    const userData = {
      id, name, email, profilePicUrl, verified, gender, DOB,
    };
    // create a token with jwt
    const token = generateToken(userData);
    return response.status(201).json({
      ...userData, token,
    });
  } catch (error) {
    if (error.code === 11000) {
      error.message = 'Sorry the email is already taken';
    }
    return next({
      status: 400,
      message: error.message,
    });
  }
};
