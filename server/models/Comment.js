import mongoose from 'mongoose';

const { Schema } = mongoose;

const ReplySchema = new Schema({
  reply: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

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
}, { timestamps: true });

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;
