import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import User from '../src/models/User';
import Category from '../src/models/Category';
import Post from '../src/models/Post';
import Comment from '../src/models/Comment';

const createConnection = require('../src/database/connection');

const userDocuments = fs.readFileSync(path.resolve(`${__dirname}/seeds/users.json`), 'utf-8');
const categoriesDocuments = fs.readFileSync(path.resolve(`${__dirname}/seeds/categories.json`), 'utf-8');
const postsDocuments = fs.readFileSync(path.resolve(`${__dirname}/seeds/posts.json`), 'utf-8');
const commentsDocuments = fs.readFileSync(path.resolve(`${__dirname}/seeds/comments.json`), 'utf-8');


createConnection()
  .then(async () => {
    const collections = await mongoose.connection.db.listCollections().toArray();
    await Promise.all(
      collections
        .map(({ name }) => name)
        .map((collection) => mongoose.connection.db.collection(collection).drop()),
    );
    await User.insertMany(JSON.parse(userDocuments));
    await Category.insertMany(JSON.parse(categoriesDocuments));
    await Post.insertMany(JSON.parse(postsDocuments));
    await Comment.insertMany(JSON.parse(commentsDocuments));
    process.exit();
  })
  .catch((error) => {
    console.error('populate error : ', error);
    process.exit(1);
  });
