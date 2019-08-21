import Joi from '@hapi/joi';

import Comment from '../models/Comment';
import addReplySchema from '../validations/replies';
import joiOptions from '../validations/joiOptions';

const addReply = async (req, res) => {
  try {
    const { commentId } = req.params;
    await Joi.validate(req.body, addReplySchema, joiOptions);
    await Comment.findByIdAndUpdate({ _id: commentId },
      { $push: { replies: req.body } });
    const currentComment = await Comment.findById(commentId);
    const reply = currentComment.replies;
    const populateComment = await currentComment.populate(`replies.${reply.length - 1}.user`, 'profilePic name').execPopulate();
    const savedReply = populateComment.replies.pop();
    return res.status(201).json({ success: true, message: 'Reply added successfully', savedReply });
  } catch (error) {
    const errorResponse = { success: false, message: 'Could not add reply', isJoi: Boolean(error.isJoi) };
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
