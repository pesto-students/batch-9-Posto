import Joi from '@hapi/joi';

const ForgotPasswordSchema = Joi.object().keys({
  email: Joi.string().email().required().label('Email'),
});

export {
  ForgotPasswordSchema,
};
