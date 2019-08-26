import faker from 'faker';
import { ObjectId } from 'mongodb';

const createPosts = (totalPosts) => {
  const users = require('./seeds/users.json');
  const categories = require('./seeds/categories.json');

  const getUserObjectIds = (totalUsers) => {
    const userSet = new Set([]);
    for (let i = 0; i < totalUsers; i += 1) {
      userSet.add(ObjectId(users[faker.random.number({ min: 0, max: users.length - 1 })]._id));
    }
    return Array.from(userSet);
  };
  const posts = [];
  for (let i = 0; i < totalPosts; i += 1) {
    posts.push({
      _id: ObjectId(),
      title: faker.lorem.sentence(),
      author: ObjectId(users[faker.random.number({ min: 0, max: users.length - 1 })]._id),
      content: faker.lorem.paragraphs(),
      upvotes: getUserObjectIds(30),
      category: ObjectId(categories[faker.random.number(
        { min: 0, max: categories.length - 1 },
      )]._id),
      public: faker.random.arrayElement([true, false, true, true, true]),
      published: faker.random.arrayElement([true, false, true, true, true]),
      views: getUserObjectIds(30),
    });
  }
  return posts;
};

export default createPosts;
