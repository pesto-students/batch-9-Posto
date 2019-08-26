import express from 'express';
import replies from './replies';
import verifyValidObjectId from '../middleware/validObjectId';

import comments from '../controllers/comments';

const router = express.Router({ mergeParams: true });

router.get('/', comments.getComments);

router.post('/', comments.addComment);

router.use('/:commentId/replies', verifyValidObjectId, replies);

export default router;
