import postModel from '../../models/Post';
import userModel from '../../models/User';
import categoryModel from '../../models/Category';

async function createPosts() {
  const post1 = await postModel.create({
    title: 'My Title',
    author: '5d5adea00f61796594c32dec',
    content: "It's very easy to make some words **bold** and other words *italic* with Markdown. You can even [link to Google!](http://google.com)",
    category: '5d5af1a31c9d4400002629d0',
    public: true,
    published: true,
  });

  const post2 = await postModel.create({
    title: '10 simple Linux tips which save 50% of my time in the command line',
    author: '5d5ba0b0d14453a47b1a379a',
    content: `In this article, or tutorial, or whatever you call it, I have shared some UNIX command 
        practices I follow to work fast, quick, productive, or efficiently in Linux.`,
    category: '5d5ba0a64f07c85c9f0bd51e',
    public: true,
    published: true,
  });

  return { post1, post2 };
}

async function createUsers() {
  const user1 = await userModel.create({
    name: 'John Smith',
    email: 'john@gmail.com',
    password: '$2b$10$y.Rbamz1o/m5kCk3x6PaIu1ibPVIK7DKi/oxvp9MS8jQUhaQbKiyq',
    profilePic: '',
    gender: 'Male',
    DOB: '2019-08-19T17:38:35.000+00:00',
  });

  const user2 = await userModel.create({
    name: 'Kent C. Dodds',
    email: 'kent@gmail.com',
    password: '$2b$10$y.Rbamz1o/m5kCk3x6PaIu1ibPVIK7DKi/oxvp9MS8jQUhaQbKiyq',
    profilePic: '',
    gender: 'Male',
    DOB: '2019-08-19T17:38:35.000+00:00',
  });

  return { user1, user2 };
}

async function createCategories() {
  const category1 = await categoryModel.create({
    name: 'Art',
  });

  const category2 = await categoryModel.create({
    name: 'Books',
  });

  const category3 = await categoryModel.create({
    name: 'Food',
  });

  const category4 = await categoryModel.create({
    name: 'Business',
  });

  const category5 = await categoryModel.create({
    name: 'Movies',
  });

  const category6 = await categoryModel.create({
    name: 'Fitness',
  });

  const category7 = await categoryModel.create({
    name: 'Travel',
  });

  const category8 = await categoryModel.create({
    name: 'Politics',
  });

  const category9 = await categoryModel.create({
    name: 'News',
  });

  const category10 = await categoryModel.create({
    name: 'Entertainment',
  });

  return [
    category1,
    category2,
    category3,
    category4,
    category5,
    category6,
    category7,
    category8,
    category9,
    category10,
  ];
}

export default {
  createUsers,
  createPosts,
  createCategories,
};
