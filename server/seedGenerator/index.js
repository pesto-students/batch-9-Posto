import util from 'util';
import fs from 'fs';
import path from 'path';
import createUsers from './users';
import createCategories from './categories';
import createPosts from './posts';
import createComments from './comments';

const writeFile = util.promisify(fs.writeFile);

const createDbFakeFiles = async () => {
  try {
    const users = await createUsers(10);
    await writeFile(path.resolve(__dirname, './seeds/users.json'), JSON.stringify(users));
    const categories = await createCategories();
    await writeFile(path.resolve(__dirname, './seeds/categories.json'), JSON.stringify(categories));
    const posts = await createPosts(20);
    await writeFile(path.resolve(__dirname, './seeds/posts.json'), JSON.stringify(posts));
    const comments = await createComments();
    await writeFile(path.resolve(__dirname, './seeds/comments.json'), JSON.stringify(comments));
  } catch (error) {
    console.log('seedGenerator error : ', error);
    process.exit();
  }
};

createDbFakeFiles().then(() => {
  process.exit();
}).catch(() => {
  process.exit();
});
