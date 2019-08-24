import mongoose from 'mongoose';

const { Schema } = mongoose;

const ReplySchema = new Schema({
  reply: {
    type: String,
    required: [true, 'Reply message is required'],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: String,
    required: true,
    default: 'active',
  },
}, { timestamps: true });

const CommentSchema = new Schema({
  comment: {
    type: String,
    required: [true, 'Comment message is required'],
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  replies: [ReplySchema],
  status: {
    type: String,
    required: true,
    default: 'active',
  },
}, { timestamps: true });

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;
