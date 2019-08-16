import dotenv from 'dotenv';

dotenv.config();
module.exports = {
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_URI: process.env.DB_URI,
  DB_NAME: process.env.DB_NAME,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS,
};
