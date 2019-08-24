import Joi from '@hapi/joi';

import Comment from '../models/Comment';
import addReplySchema from '../validations/replies';
import joiOptions from '../validations/joiOptions';

const addReply = async (req, res) => {
  try {
    const { commmentId } = req.params;
    await Joi.validate(req.body, addReplySchema, joiOptions);
    const comment = await Comment.findByIdAndUpdate({ _id: commmentId },
      { $push: { replies: req.body } });
    const savedComment = await comment.save();
    return res.status(201).json({ success: true, message: 'Reply added successfully', savedComment });
  } catch (error) {
    const errorResponse = { success: false, message: 'Could not add reply', isJoi: !!error.isJoi };
    if (error.isJoi) {
      errorResponse.error = error.details;
    }
    return res.status(400).json(errorResponse);
  }
};

const replyController = {
  addReply,
};

export default replyController;
