import Joi from '@hapi/joi';
import { ObjectId } from 'mongodb';
import Post from '../models/Post';
import {
  addPostSchema, editPostSchema, UpVoteSchema, searchSchema,
} from '../validations/posts';
import joiOptions from '../validations/joiOptions';

const addPost = async function addPost(req, res) {
  try {
    await Joi.validate(req.body, addPostSchema, joiOptions);
    const newPost = new Post(req.body);
    const post = await newPost.save();
    return res.status(201).json({ success: true, message: 'Post added successfully', post });
  } catch (error) {
    const errorResponse = { success: false, message: 'Could not add post', isJoi: !!error.isJoi };
    if (error.isJoi) {
      errorResponse.error = error.details;
    }
    return res.status(400).json(errorResponse);
  }
};

const editPost = async function editPost(req, res) {
  try {
    const { postId } = req.params;
    if (!ObjectId.isValid(postId)) {
      return res.status(400).json({ success: false, message: 'Invalid post id value' });
    }
    await Joi.validate(req.body, editPostSchema, joiOptions);
    const result = await Post.findByIdAndUpdate({ _id: req.params.postId }, req.body);
    if (!result) {
      return res.status(200).json({ success: false, message: 'Post not found' });
    }
    return res.status(200).json({ success: true, message: 'Post updated successfully' });
  } catch (error) {
    const errorResponse = { success: false, message: 'Could not update post', isJoi: !!error.isJoi };
    if (error.isJoi) {
      errorResponse.error = error.details;
    }
    return res.status(400).json(errorResponse);
  }
};

const updateUpvote = async function updateUpvote(req, res) {
  try {
    const { postId, type } = req.params;
    const { userId } = req.body;
    if (!ObjectId.isValid(postId)) {
      return res.status(400).json({ success: false, message: 'Invalid post id value' });
    }
    await Joi.validate(req.body, UpVoteSchema, joiOptions);
    if (type === 'upvote') {
      await Post.findByIdAndUpdate(postId, { $addToSet: { upvotes: userId } },
        { safe: true, upsert: true });
    } else if (type === 'downvote') {
      await Post.findByIdAndUpdate(postId, { $pull: { upvotes: userId } },
        { safe: true, upsert: true });
    } else {
      return res.status(400).json({ success: false, message: 'Invalid vote type' });
    }
    return res.status(200).json({ success: true, message: `${type} successful` });
  } catch (error) {
    const errorResponse = { success: false, message: 'Could not update post', isJoi: !!error.isJoi };
    if (error.isJoi) {
      errorResponse.error = error.details;
    }
    return res.status(400).json(errorResponse);
  }
};

const getPost = async function getPost(req, res) {
  const { postId } = req.params;
  try {
    if (!ObjectId.isValid(postId)) {
      return res.status(400).json({ success: false, message: 'Invalid post id value' });
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(200).json({ success: false, message: 'Post not found' });
    }
    return res.status(200).json({ success: true, message: 'Post found', post });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const getPosts = async function getPosts(req, res) {
  try {
    const query = {};
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = parseInt(req.query.skip, 10) || 0;
    const orderBy = req.query.orderBy || 'createdAt';
    const orderType = req.query.orderType || -1;
    const order = {};
    order[`${orderBy}`] = orderType;
    const projections = req.query.keys || '';
    const select = projections.split(',').join(' ');
    const posts = await Post.find(query).select(select).sort(order).skip(skip)
      .limit(limit);

    if (Array.isArray(posts) && !posts.length) {
      return res.status(200).json({ success: false, message: 'No Posts found' });
    }
    return res.status(200).json({ success: true, message: 'Posts fetched', posts });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const deletePost = async function deletePost(req, res) {
  try {
    const { postId } = req.params;
    if (!ObjectId.isValid(postId)) {
      return res.status(400).json({ success: false, message: 'Invalid post id value' });
    }
    const post = await Post.findByIdAndDelete(postId);
    return res.status(200).json({ success: true, message: 'Post deleted', post });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const searchPosts = async function searchPosts(req, res) {
  try {
    await Joi.validate(req.body, searchSchema, joiOptions);
    const {
      term, category, skip, limit,
    } = req.body;
    const filter = {
      category,
      $text: {
        $search: term,
      },
      public: true,
      published: true,
    };
    if (category === 'all' || category === undefined) {
      delete filter.category;
    }
    const results = await Post.find(filter, { score: { $meta: 'textScore' } })
      .sort({ score: { $meta: 'textScore' } })
      .skip(parseInt(skip, 10))
      .limit(parseInt(limit, 10))
      .populate('author', 'profilePic email name')
      .lean();

    if (Array.isArray(results) && results.length === 0) {
      return res.status(200).json({ success: false, message: 'No results found' });
    }
    return res.status(200).json({ success: true, message: 'Results found', results });
  } catch (error) {
    const errorResponse = { success: false, message: 'Could not fetch search results', isJoi: !!error.isJoi };
    if (error.isJoi) {
      errorResponse.error = error.details;
    }
    return res.status(400).json(errorResponse);
  }
};

const controllerMethods = {
  addPost,
  editPost,
  updateUpvote,
  getPost,
  getPosts,
  deletePost,
  searchPosts,
};

export default controllerMethods;
