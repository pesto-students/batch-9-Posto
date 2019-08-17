import dotenv from 'dotenv';

dotenv.config();
const environment = (process.env.ENVIRONMENT || 'dev').toUpperCase();
const envVariables = {
  DB_USERNAME: process.env[`${environment}_DB_USERNAME`],
  DB_PASSWORD: process.env[`${environment}_DB_PASSWORD`],
  DB_URI: process.env[`${environment}_DB_URI`],
  DB_NAME: process.env[`${environment}_DB_NAME`],
};

export default envVariables;
