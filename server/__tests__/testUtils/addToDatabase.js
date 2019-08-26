import postModel from '../../models/Post';
import userModel from '../../models/User';
import categoryModel from '../../models/Category';
import commentModel from '../../models/Comment';

async function createPosts() {
  await postModel.syncIndexes();
  const post1 = await postModel.create({
    title: 'How The Title is written',
    author: '5d5adea00f61796594c32dec',
    content: "It's very easy to make some javascript words **bold** and the other words *italic* with Markdown. You can even [link to Google!](http://google.com)",
    category: '5d5af1a31c9d4400002629d0',
    public: true,
    published: true,
  });

  const post2 = await postModel.create({
    title: 'How 10 simple Linux tips which save 50% of my time in the command line',
    author: '5d5ba0b0d14453a47b1a379a',
    content: `In this article, or tutorial, or javascript whatever you call it, I have shared some UNIX command 
        practices I follow to work fast, quick, productive, or efficiently in Linux.`,
    category: '5d5ba0a64f07c85c9f0bd51e',
    public: true,
    published: true,
  });

  const post3 = await postModel.create({
    title: 'NodeJS: How To Run Scripts From The Terminal & Use Arguments in javascript',
    author: '5d5ba0b0d14453a47b1a379a',
    content: `args[0] is the path to the executable file,
    args[1] is the path to the executed file,
    args[2] is the additional commandline argument from step 2.
    
    So if we want to use our additional commandline argument,
    we can use it like this in a JavaScript file`,
    category: '5d5ba0a64f07c85c9f0bd51e',
    public: false,
    published: true,
  });

  const post4 = await postModel.create({
    title: 'The 2 ways to learn how to code',
    author: '5d5ba0b0d14453a47b1a379a',
    content: `When I started programming two years ago, I was 13, I still wanted to code without reading documentation or without to know basics.
    That's how I started to learn HTML and javascript, then I learned PHP, in the beginning, I learned the Copy/Paste Oriented Programming. 
    But over time I learned a lot of things through practice. I started to stop copy paste and to test the libs I was using 
    by testing all methods/functions/class which was in those libraries. And that's how I discovered the practical way to learn to code.`,
    category: '5d5ba0a64f07c85c9f0bd51e',
    public: true,
    published: false,
  });

  return {
    post1, post2, post3, post4,
  };
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

async function createComments(postId) {
  const comment1 = await commentModel.create({
    comment: 'Great post!',
    author: '5d5adea00f61796594c32dec',
    post: postId,
    status: 'active',
  });

  const comment2 = await commentModel.create({
    comment: 'Thanks for sharing your views',
    author: '5d5ba0b0d14453a47b1a379a',
    post: postId,
    status: 'active',
  });

  const comment3 = await commentModel.create({
    comment: 'Thanks, it saved me a hell lot of time',
    author: '5d5ba0b0d14453a47b1a379b',
    post: postId,
    status: 'active',
  });

  const comment4 = await commentModel.create({
    comment: 'Good',
    author: '5d5ba0b0d14453a47b1a379c',
    post: '5d5ba0b0d14453a47b1a591c',
    status: 'active',
  });

  return {
    comment1, comment2, comment3, comment4,
  };
}

export default {
  createUsers,
  createPosts,
  createCategories,
  createComments,
};
