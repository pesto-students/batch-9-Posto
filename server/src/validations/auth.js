import Joi from '@hapi/joi';

const ForgotPasswordSchema = Joi.object().keys({
  email: Joi.string().email().required().label('Email'),
});

const ResetPasswordSchema = Joi.object().keys({
  token: Joi.string().required().label('Token'),
  newPassword: Joi.string()
    .regex(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$'))
    .required().error(() => ({
      message: 'Password should contain at least 1 capital, 1 small, 1 special character, and 1 number and should be minimum 8 characters in length',
    }))
    .label('New Password'),
});

export {
  ForgotPasswordSchema,
  ResetPasswordSchema,
};
