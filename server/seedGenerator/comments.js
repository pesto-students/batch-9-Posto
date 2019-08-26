import faker from 'faker';
import { ObjectId } from 'mongodb';

const createComments = () => {
  const users = require('./seeds/users.json');
  const posts = require('./seeds/posts.json');

  const createReplies = (totalReplies) => {
    const replies = [];
    for (let i = 0; i < totalReplies; i += 1) {
      replies.push({
        _id: ObjectId(),
        reply: faker.lorem.sentence(),
        user: ObjectId(users[faker.random.number({ min: 0, max: users.length - 1 })]._id),
        status: 'active',
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
      });
    }
    return replies;
  };

  const comments = [];
  for (let i = 0; i < posts.length; i += 1) {
    const totalComments = faker.random.number({ min: 10, max: 20 });
    for (let j = 0; j < totalComments; j += 1) {
      comments.push({
        _id: ObjectId(),
        comment: faker.lorem.sentences(),
        post: ObjectId(posts[i]._id),
        user: ObjectId(users[faker.random.number({ min: 0, max: users.length - 1 })]._id),
        replies: createReplies(faker.random.number({ min: 10, max: 20 })),
        status: 'active',
      });
    }
  }
  return comments;
};

export default createComments;
