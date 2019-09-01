import config from '../config';
import {
  invalidResponse,
  decodeToken,
} from '../utils';


const loginRequired = async (request, response, next) => {
  try {
    const { bypasstoken } = request.query;
    if (bypasstoken && bypasstoken === config.BYPASS_TOKEN) {
      return next();
    }
    const decoded = await decodeToken(request.headers.authorization);
    if (decoded) {
      return next();
    }
    return invalidResponse(response, 403, 'Invalid Token, please send the correct token');
  } catch (error) {
    return invalidResponse(response, 403, 'Token missing, please send the jwt token');
  }
};

const ensureCorrectUser = async (request, response, next) => {
  try {
    const decoded = await decodeToken(request.headers.authorization);
    if (decoded && decoded.id === request.params.id) {
      return next();
    }
    return invalidResponse(response, 403, 'Unauthorized');
  } catch (error) {
    return invalidResponse(response, 403, 'Token missing, please send the jwt token');
  }
};

export {
  ensureCorrectUser,
  loginRequired,
};
