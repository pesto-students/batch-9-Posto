import JoiBase from '@hapi/joi';
import ObjectIdValidator from '../helpers/ObjectId';

const Joi = JoiBase.extend(ObjectIdValidator);

const CommentSchema = Joi.object().keys({
  comment: Joi.string().required().label('Comment'),
  user: Joi.objectId().required().label('User'),
  post: Joi.objectId().required().label('Post'),
  status: Joi.string().required().label('Status'),
  replies: Joi.array().length(0),
});

export {
  CommentSchema as addCommentSchema,
  CommentSchema as editCommentSchema,
};
