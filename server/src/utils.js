import jwt from 'jsonwebtoken';

import config from './config';

function invalidResponse(response, status, message) {
  return response.status(Number(status)).json({
    success: false,
    message,
  });
}

function successfulResponse(response, status, message, userData, token) {
  return response.status(Number(status)).json({
    success: true,
    message,
    user: { ...userData, token },
  });
}

function destructorUserData({
  id,
  email,
  profilePic,
  gender,
  DOB,
  name,
}) {
  return {
    id,
    email,
    profilePic,
    gender,
    DOB,
    name,
  };
}

function getToken(userData) {
  return jwt.sign(userData, config.JWT_SECRET_KEY, { expiresIn: '7d' });
}

const decodeToken = async (bearerToken) => {
  const token = bearerToken.split(' ')[1];
  const decoded = await jwt.verify(token, config.JWT_SECRET_KEY);
  return decoded;
};

function passwordPatternCheck(password) {
  const pattern = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$');
  return pattern.test(password);
}

export {
  invalidResponse,
  destructorUserData,
  successfulResponse,
  getToken,
  decodeToken,
  passwordPatternCheck,
};
