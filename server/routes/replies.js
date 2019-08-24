import express from 'express';
import replies from '../controllers/replies';

const router = express.Router({ mergeParams: true });

router.post('/', replies.addReply);

module.exports = router;
