import express from 'express';
import posts from '../controllers/posts';
import comments from './comments';

const router = express.Router();

router.get('/', posts.getPosts);

router.get('/:postId', posts.getPost);

router.post('/', posts.addPost);

router.put('/:postId', posts.editPost);

router.patch('/:postId/:type', posts.updateUpvote);

router.delete('/:postId', posts.deletePost);

router.use('/:postId/comments', comments);

module.exports = router;
