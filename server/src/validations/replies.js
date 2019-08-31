import JoiBase from '@hapi/joi';
import ObjectIdValidator from '../helpers/ObjectId';

const Joi = JoiBase.extend(ObjectIdValidator);

const ReplySchema = Joi.object().keys({
  reply: Joi.string().required().label('Reply'),
  user: Joi.objectId().required().label('User'),
});

export default ReplySchema;
