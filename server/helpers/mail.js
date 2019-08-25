import nodemailer from 'nodemailer';
import Joi from '@hapi/joi';
import pug from 'pug';
import path from 'path';
import { MailSchema } from '../validations/mail';
import joiOptions from '../validations/joiOptions';
import config from '../config';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.EMAIL,
    pass: config.EMAIL_PASSWORD,
  },
});

const sendMail = async function sendMail(type, mailOptions, variables) {
  if (config.ENVIRONMENT === 'dev') {
    return;
  }
  const inputs = { ...mailOptions, type };
  await Joi.validate(inputs, MailSchema, joiOptions);
  const filePath = path.resolve(__dirname, `../mailTemplates/${type}.pug`);
  const pugToHtml = pug.renderFile(filePath, variables);
  inputs.html = pugToHtml;
  await transporter.sendMail(inputs);
};

export {
  sendMail,
};
