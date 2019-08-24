import request from 'supertest';
import addToDatabase from '../testUtils/addToDatabase';
import postsModel from '../../models/Post';
import testDbHelper from '../testUtils/testDbHelper';
import app from '../../app';

beforeAll(async () => {
  await testDbHelper.createConnection();
});

afterAll(async () => {
  await testDbHelper.closeConnection();
});

afterEach(async () => {
  await testDbHelper.cleanup();
});

describe('Add Post', () => {
  test('should add a new post', (done) => {
    const post = {
      title: 'My Title',
      author: '5d5adea00f61796594c32dec',
      content: "It's very easy to make some words **bold** and other words *italic* with Markdown. You can even [link to Google!](http://google.com)",
      category: '5d5af1a31c9d4400002629d0',
      public: true,
      published: true,
    };
    request(app)
      .post('/posts')
      .send(post)
      .set('Accept', 'application/json')
      .expect(201)
      .expect((response) => {
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Post added successfully');
        expect(response.body.post).toMatchObject(post);
      })
      .end((error) => {
        if (error) {
          return done(error);
        }
        return done();
      });
  });


  test('should throw Joi validation errors', (done) => {
    const post = {};
    request(app)
      .post('/posts')
      .send(post)
      .set('Accept', 'application/json')
      .expect(400)
      .expect((response) => {
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Could not add post');
        expect(response.body.isJoi).toBe(true);
      })
      .end((error) => {
        if (error) {
          return done(error);
        }
        return done();
      });
  });
});

describe('Edit Post', () => {
  test('should edit an existing post', async (done) => {
    const { post1 } = await addToDatabase.createPosts();
    const updatePostBody = {
      title: 'Edit Post',
      author: '5d5adea00f61796594c32dec',
      content: 'Edit Content',
      category: '5d5af1a31c9d4400002629d0',
      public: true,
      published: true,
    };
    request(app)
      .put(`/posts/${post1._id}`)
      .send(updatePostBody)
      .set('Accept', 'application/json')
      .expect(200)
      .expect(async (response) => {
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Post updated successfully');
        const post = await postsModel.findById(post1._id);
        const postObject = JSON.parse(JSON.stringify(post));
        expect(postObject).toMatchObject(updatePostBody);
      })
      .end((error) => {
        if (error) {
          return done(error);
        }
        return done();
      });
  });


  test('should throw Joi validation errors', async (done) => {
    const { post1 } = await addToDatabase.createPosts();
    const updatePostBody = {};
    request(app)
      .put(`/posts/${post1._id}`)
      .send(updatePostBody)
      .set('Accept', 'application/json')
      .expect(400)
      .expect((response) => {
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Could not update post');
        expect(response.body.isJoi).toBe(true);
      })
      .end((error) => {
        if (error) {
          return done(error);
        }
        return done();
      });
  });

  test('should throw error for invalid postId', async (done) => {
    const updatePostBody = {
      title: 'Edit Post',
      author: '5d5adea00f61796594c32dec',
      content: 'Edit Content',
      category: '5d5af1a31c9d4400002629d0',
      public: true,
      published: true,
    };
    request(app)
      .put('/posts/xyz')
      .send(updatePostBody)
      .set('Accept', 'application/json')
      .expect(400)
      .expect((response) => {
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('postId should be a valid object id');
      })
      .end((error) => {
        if (error) {
          return done(error);
        }
        return done();
      });
  });

  test('should throw error for document not in collection', async (done) => {
    const updatePostBody = {
      title: 'Edit Post',
      author: '5d5adea00f61796594c32dec',
      content: 'Edit Content',
      category: '5d5af1a31c9d4400002629d0',
      public: true,
      published: true,
    };
    request(app)
      .put('/posts/5d5adea00f61796594c32dec')
      .send(updatePostBody)
      .set('Accept', 'application/json')
      .expect(200)
      .expect((response) => {
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Post not found');
      })
      .end((error) => {
        if (error) {
          return done(error);
        }
        return done();
      });
  });
});

describe('Upvote', () => {
  test('should add a upvote', async (done) => {
    const { user1 } = await addToDatabase.createUsers();
    const { post1 } = await addToDatabase.createPosts();
    request(app)
      .patch(`/posts/${post1._id}/upvote`)
      .send({ userId: user1._id })
      .set('Accept', 'application/json')
      .expect(200)
      .expect(async (response) => {
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('upvote successful');
        const post = await postsModel.findById(post1._id);
        expect(post.upvotes).toContainEqual(user1._id);
      })
      .end((error) => {
        if (error) {
          return done(error);
        }
        return done();
      });
  });
});

describe('Downvote', () => {
  test('should remove a user upvote', async (done) => {
    const { user1 } = await addToDatabase.createUsers();
    const { post1 } = await addToDatabase.createPosts();
    request(app)
      .patch(`/posts/${post1._id}/downvote`)
      .send({ userId: user1._id })
      .set('Accept', 'application/json')
      .expect(200)
      .expect(async (response) => {
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('downvote successful');
        const post = await postsModel.findById(post1._id);
        expect(post.upvotes).not.toContainEqual(user1._id);
      })
      .end((error) => {
        if (error) {
          return done(error);
        }
        return done();
      });
  });
});

describe('Upvote / Downvote', () => {
  test('should throw error for unknown type', async (done) => {
    const { user1 } = await addToDatabase.createUsers();
    const { post1 } = await addToDatabase.createPosts();
    request(app)
      .patch(`/posts/${post1._id}/xyz`)
      .send({ userId: user1._id })
      .set('Accept', 'application/json')
      .expect(400)
      .expect(async (response) => {
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Invalid vote type');
      })
      .end((error) => {
        if (error) {
          return done(error);
        }
        return done();
      });
  });
});

describe('Get Post', () => {
  test('should throw error for invalid postId value', async (done) => {
    request(app)
      .get('/posts/xyz')
      .set('Accept', 'application/json')
      .expect(400)
      .expect(async (response) => {
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('postId should be a valid object id');
      })
      .end((error) => {
        if (error) {
          return done(error);
        }
        return done();
      });
  });

  test('should get a post', async (done) => {
    const { post1 } = await addToDatabase.createPosts();
    request(app)
      .get(`/posts/${post1._id}`)
      .set('Accept', 'application/json')
      .expect(200)
      .expect((response) => {
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Post found');
      })
      .end((error) => {
        if (error) {
          return done(error);
        }
        return done();
      });
  });

  test('should return post not found', async (done) => {
    request(app)
      .get('/posts/5d5adea00f61796594c32dec')
      .set('Accept', 'application/json')
      .expect(200)
      .expect((response) => {
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Post not found');
      })
      .end((error) => {
        if (error) {
          return done(error);
        }
        return done();
      });
  });
});

describe('Get Posts', () => {
  test('Should get all the posts', async (done) => {
    const posts = await addToDatabase.createPosts();
    request(app)
      .get('/posts')
      .set('Accept', 'application/json')
      .expect(200)
      .expect((response) => {
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Posts fetched');
        expect(response.body.posts.length).toBe(Object.keys(posts).length);
      })
      .end((error) => {
        if (error) {
          return done(error);
        }
        return done();
      });
  });

  test('Should get all the posts by limit', async (done) => {
    await addToDatabase.createPosts();
    request(app)
      .get('/posts?limit=1')
      .set('Accept', 'application/json')
      .expect(200)
      .expect((response) => {
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Posts fetched');
        expect(response.body.posts.length).toBe(1);
      })
      .end((error) => {
        if (error) {
          return done(error);
        }
        return done();
      });
  });

  test('Should get the posts by skip', async (done) => {
    const posts = await addToDatabase.createPosts();
    request(app)
      .get('/posts?skip=1')
      .set('Accept', 'application/json')
      .expect(200)
      .expect((response) => {
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Posts fetched');
        const post3 = JSON.parse(JSON.stringify(posts.post3));
        expect(response.body.posts[0]).toMatchObject(post3);
      })
      .end((error) => {
        if (error) {
          return done(error);
        }
        return done();
      });
  });

  test('Should get the posts by orderBy and orderType Ascending', async (done) => {
    const posts = await addToDatabase.createPosts();
    request(app)
      .get('/posts?orderBy=createdAt&orderType=1')
      .set('Accept', 'application/json')
      .expect(200)
      .expect((response) => {
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Posts fetched');
        const post1 = JSON.parse(JSON.stringify(posts.post1));
        const post2 = JSON.parse(JSON.stringify(posts.post2));
        expect(response.body.posts[0]).toMatchObject(post1);
        expect(response.body.posts[1]).toMatchObject(post2);
      })
      .end((error) => {
        if (error) {
          return done(error);
        }
        return done();
      });
  });

  test('Should get the posts by orderBy and orderType Descending', async (done) => {
    const posts = await addToDatabase.createPosts();
    request(app)
      .get('/posts?orderBy=createdAt&orderType=-1')
      .set('Accept', 'application/json')
      .expect(200)
      .expect((response) => {
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Posts fetched');
        const post4 = JSON.parse(JSON.stringify(posts.post4));
        const post3 = JSON.parse(JSON.stringify(posts.post3));
        expect(response.body.posts[0]).toMatchObject(post4);
        expect(response.body.posts[1]).toMatchObject(post3);
      })
      .end((error) => {
        if (error) {
          return done(error);
        }
        return done();
      });
  });

  test('Should return no posts if none exists', async (done) => {
    request(app)
      .get('/posts')
      .set('Accept', 'application/json')
      .expect(200)
      .expect((response) => {
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('No Posts found');
      })
      .end((error) => {
        if (error) {
          return done(error);
        }
        return done();
      });
  });

  test('Should get the posts by userId and type published', async (done) => {
    await addToDatabase.createPosts();
    request(app)
      .get('/posts?type=user-published&userId=5d5ba0b0d14453a47b1a379a')
      .set('Accept', 'application/json')
      .expect(200)
      .expect((response) => {
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Posts fetched');
        expect(response.body.posts.length).toEqual(1);
      })
      .end((error) => {
        if (error) {
          return done(error);
        }
        return done();
      });
  });

  test('Should get the posts by userId and type draft', async (done) => {
    await addToDatabase.createPosts();
    request(app)
      .get('/posts?type=user-draft&userId=5d5ba0b0d14453a47b1a379a')
      .set('Accept', 'application/json')
      .expect(200)
      .expect((response) => {
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Posts fetched');
        expect(response.body.posts.length).toEqual(1);
      })
      .end((error) => {
        if (error) {
          return done(error);
        }
        return done();
      });
  });

  test('Should get the posts by userId and type private', async (done) => {
    await addToDatabase.createPosts();
    request(app)
      .get('/posts?type=user-private&userId=5d5ba0b0d14453a47b1a379a')
      .set('Accept', 'application/json')
      .expect(200)
      .expect((response) => {
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Posts fetched');
        expect(response.body.posts.length).toEqual(1);
      })
      .end((error) => {
        if (error) {
          return done(error);
        }
        return done();
      });
  });
});

describe('Delete post', () => {
  test('Should delete a post', async (done) => {
    const { post1 } = await addToDatabase.createPosts();
    request(app)
      .delete(`/posts/${post1._id}`)
      .set('Accept', 'application/json')
      .expect(200)
      .expect(async (response) => {
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Post deleted');
        const getPost = await postsModel.findById(post1._id);
        expect(getPost).toBe(null);
      })
      .end((error) => {
        if (error) {
          return done(error);
        }
        return done();
      });
  });

  test('Should throw error for invalid postId', async (done) => {
    request(app)
      .delete('/posts/xyz')
      .set('Accept', 'application/json')
      .expect(400)
      .expect(async (response) => {
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('postId should be a valid object id');
      })
      .end((error) => {
        if (error) {
          return done(error);
        }
        return done();
      });
  });
});


describe('Search Posts', () => {
  test('Should fetch Posts', async (done) => {
    await addToDatabase.createPosts();
    request(app)
      .post('/posts/search')
      .set('Accept', 'application/json')
      .send({
        term: 'written',
        category: 'all',
        skip: 0,
        limit: 10,
      })
      .expect(200)
      .expect((response) => {
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Results found');
      })
      .end((error) => {
        if (error) {
          return done(error);
        }
        return done();
      });
  });

  test('Should fetch Posts by category id', async (done) => {
    await addToDatabase.createPosts();
    request(app)
      .post('/posts/search')
      .set('Accept', 'application/json')
      .send({
        term: 'written',
        category: '5d5af1a31c9d4400002629d0',
        skip: 0,
        limit: 10,
      })
      .expect(200)
      .expect((response) => {
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Results found');
      })
      .end((error) => {
        if (error) {
          return done(error);
        }
        return done();
      });
  });

  test('Should fetch Posts with skip option', async (done) => {
    await addToDatabase.createPosts();
    request(app)
      .post('/posts/search')
      .set('Accept', 'application/json')
      .send({
        term: 'javascript',
        category: 'all',
        skip: 1,
        limit: 10,
      })
      .expect(200)
      .expect((response) => {
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Results found');
      })
      .end((error) => {
        if (error) {
          return done(error);
        }
        return done();
      });
  });

  test('Should fetch Posts with limit option', async (done) => {
    await addToDatabase.createPosts();
    request(app)
      .post('/posts/search')
      .set('Accept', 'application/json')
      .send({
        term: 'javascript',
        category: 'all',
        skip: 0,
        limit: 2,
      })
      .expect(200)
      .expect((response) => {
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Results found');
        expect(response.body.results.length).toEqual(2);
      })
      .end((error) => {
        if (error) {
          return done(error);
        }
        return done();
      });
  });

  test('Should fetch Posts sorted by score', async (done) => {
    await addToDatabase.createPosts();
    request(app)
      .post('/posts/search')
      .set('Accept', 'application/json')
      .send({
        term: 'javascript',
        category: 'all',
        skip: 0,
        limit: 0,
      })
      .expect(200)
      .expect((response) => {
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Results found');
        const { results } = response.body;
        const score1 = results[0].score;
        const score2 = results[1].score;
        expect(score1).toBeGreaterThanOrEqual(score2);
      })
      .end((error) => {
        if (error) {
          return done(error);
        }
        return done();
      });
  });
});
