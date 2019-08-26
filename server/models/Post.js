import mongoose from 'mongoose';

const { Schema } = mongoose;

const PostSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  content: {
    type: String,
    required: true,
    default: '',
  },
  upvotes: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  public: {
    type: Boolean,
    default: true,
  },
  published: {
    type: Boolean,
    default: false,
  },
  views: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
}, { timestamps: true });

PostSchema.index({
  title: 'text',
  content: 'text',
  category: 1,
}, {
  weights: {
    title: 5,
    content: 1,
  },
  name: 'searchIndex',
});

const Post = mongoose.model('Post', PostSchema);

export default Post;
