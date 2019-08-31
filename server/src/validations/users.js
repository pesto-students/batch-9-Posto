import JoiBase from '@hapi/joi';
import ObjectIdValidator from '../helpers/ObjectId';

const Joi = JoiBase.extend(ObjectIdValidator);

const UserSchema = Joi.object().keys({
  name: Joi.string().required().label('Name'),
  email: Joi.string().email({ minDomainSegments: 2 }).required().label('Email'),
  gender: Joi.string().required().valid('Male', 'Female', 'Other').label('Gender'),
  DOB: Joi.date().max(Date.now()).required().label('Date Of Birth'),
});

export default UserSchema;
