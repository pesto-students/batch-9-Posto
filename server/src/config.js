import dotenv from 'dotenv';

dotenv.config();
const environment = (process.env.ENVIRONMENT || 'dev').toUpperCase();
const envVariables = {
  BLOG_URL: process.env[`${environment}_BLOG_URL`],
  DB_USERNAME: process.env[`${environment}_DB_USERNAME`],
  DB_PASSWORD: process.env[`${environment}_DB_PASSWORD`],
  DB_URI: process.env[`${environment}_DB_URI`],
  DB_NAME: process.env[`${environment}_DB_NAME`],
  EMAIL: process.env[`${environment}_EMAIL`],
  EMAIL_PASSWORD: process.env[`${environment}_EMAIL_PASSWORD`],
  ENVIRONMENT: process.env.ENVIRONMENT,
  JWT_SECRET_KEY: process.env[`${environment}_JWT_SECRET_KEY`],
  CLOUDINARY_CLOUD_NAME: process.env[`${environment}_CLOUDINARY_CLOUD_NAME`],
  CLOUDINARY_API_KEY: process.env[`${environment}_CLOUDINARY_API_KEY`],
  CLOUDINARY_API_SECRET: process.env[`${environment}_CLOUDINARY_API_SECRET`],
};

export default envVariables;
