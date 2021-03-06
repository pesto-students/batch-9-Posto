import JoiBase from '@hapi/joi';
import ObjectIdValidator from '../helpers/ObjectId';

const Joi = JoiBase.extend(ObjectIdValidator);

const PostSchema = Joi.object().keys({
  title: Joi.string().required().label('Title'),
  author: Joi.objectId().required().label('Author'),
  content: Joi.string().required().label('Content'),
  category: Joi.any().when('published', { is: true, then: Joi.objectId().required() }).label('Category'),
  public: Joi.boolean().required().label('Public'),
  published: Joi.boolean().required().label('Published'),
});

const UpVoteSchema = Joi.object().keys({
  userId: Joi.objectId().required().label('User Id'),
});

const searchSchema = Joi.object().keys({
  term: Joi.string().required().allow(['']).label('Term'),
  category: Joi.objectId().required().allow(['all']).label('Category'),
  skip: Joi.number().min(0).required().label('Skip'),
  limit: Joi.number().min(0).required().label('Limit'),
});

export {
  PostSchema as addPostSchema,
  PostSchema as editPostSchema,
  UpVoteSchema,
  searchSchema,
};
