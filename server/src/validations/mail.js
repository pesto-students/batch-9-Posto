import Joi from '@hapi/joi';

const MailSchema = Joi.object().keys({
  to: Joi.string().email().required().label('To'),
  subject: Joi.string().required().label('Subject'),
  type: Joi.string().required().allow(['welcome', 'forgot-password']).label('Type'),
});

export {
  MailSchema,
};
