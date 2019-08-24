import express from 'express';
import posts from '../controllers/posts';
import comments from './comments';
import verifyValidObjectId from '../middleware/validObjectId';

const router = express.Router();

router.get('/', posts.getPosts);

router.get('/:postId', verifyValidObjectId, posts.getPost);

router.post('/', posts.addPost);

router.post('/search', posts.searchPosts);

router.put('/:postId', verifyValidObjectId, posts.editPost);

router.patch('/:postId/:type', verifyValidObjectId, posts.updateUpvote);

router.delete('/:postId', verifyValidObjectId, posts.deletePost);

router.use('/:postId/comments', comments);

module.exports = router;
