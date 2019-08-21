import Joi from '@hapi/joi';

import Comment from '../models/Comment';
import { addCommentSchema } from '../validations/comments';
import joiOptions from '../validations/joiOptions';

const getComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const limit = parseInt(req.query.limit, 10) || 0;
    const skip = parseInt(req.query.skip, 10) || 0;
    const comments = await Comment.find({ post: postId })
      .select('comment createdAt user replies.reply replies.user replies.createdAt replies._id')
      .populate('user', 'name profilePic')
      .populate('replies.user', 'name profilePic')
      .skip(skip)
      .limit(limit)
      .lean();
    if (Array.isArray(comments) && !comments.length) {
      return res.status(200).json({ success: false, message: 'No Comments found' });
    }
    return res.status(200).json({ success: true, message: 'Comments fetched', comments });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    req.body.post = postId;
    await Joi.validate(req.body, addCommentSchema, joiOptions);
    const comment = new Comment(req.body);
    const result = await comment.save();
    const savedComment = await result.populate('user', 'profilePic name').execPopulate();
    return res.status(201).json({ success: true, message: 'Comment added successfully', savedComment });
  } catch (error) {
    const errorResponse = { success: false, message: 'Could not add comment', isJoi: Boolean(error.isJoi) };
    if (error.isJoi) {
      errorResponse.error = error.details;
    }
    return res.status(400).json(errorResponse);
  }
};

const commentController = {
  getComments,
  addComment,
};

export default commentController;
