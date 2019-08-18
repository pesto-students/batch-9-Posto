import dotenv from 'dotenv';

dotenv.config();
const environment = (process.env.ENVIRONMENT || 'dev').toUpperCase();
const envVariables = {
  DB_USERNAME: process.env[`${environment}_DB_USERNAME`],
  DB_PASSWORD: process.env[`${environment}_DB_PASSWORD`],
  DB_URI: process.env[`${environment}_DB_URI`],
  DB_NAME: process.env[`${environment}_DB_NAME`],
  EMAIL: process.env[`${environment}_EMAIL`],
  EMAIL_PASSWORD: process.env[`${environment}_EMAIL_PASSWORD`],
  ENVIRONMENT: process.env.ENVIRONMENT,
  JWT_SECRET_KEY: process.env[`${environment}_JWT_SECRET_KEY`],
};

export default envVariables;
