import mongoose from 'mongoose';

const { Schema } = mongoose;

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
  replies: [{
    reply: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  }],
}, { timestamps: true });

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;
