import { ObjectId } from 'mongodb';

const verifyValidObjectId = function verifyValidObjectId(req, res, next) {
  try {
    const keys = req.params;
    const invalidEntries = Object.keys(keys).filter((key) => key.includes('Id') && !ObjectId.isValid(keys[key]));
    if (!invalidEntries.length) {
      return next();
    }
    return res.status(400)
      .json({ success: false, message: `${invalidEntries} should be a valid object id` });
  } catch (error) {
    return res.status(400).json({ success: false, message: 'Could not complete the request' });
  }
};

export default verifyValidObjectId;
