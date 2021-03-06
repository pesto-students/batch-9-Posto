import { ObjectId } from 'mongodb';

const ObjectIdValidator = {
  name: 'objectId',
  language: {
    invalid: 'needs to be a valid ObjectId',
  },
  pre(value, state, options) {
    if (!ObjectId.isValid(value)) {
      return this.createError('objectId.invalid', { value }, state, options);
    }

    if (options.convert) {
      return new ObjectId(value);
    }

    return value;
  },
};

export default ObjectIdValidator;
