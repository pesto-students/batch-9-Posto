import request from 'supertest';
import addToDatabase from '../testUtils/addToDatabase';
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

describe('Add Comment', () => {
  test('should add a new comment', async (done) => {
    const { post1 } = await addToDatabase.createPosts();
    const comment = {
      comment: 'Good Post',
      user: '5d5adea00f61796594c32dec',
      status: 'active',
    };
    request(app)
      .post(`/posts/${post1._id}/comments`)
      .send(comment)
      .set('Accept', 'application/json')
      .expect(201)
      .expect((response) => {
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Comment added successfully');
        expect(response.body.savedComment).toMatchObject(comment);
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
    const comment = {};
    request(app)
      .post(`/posts/${post1._id}/comments`)
      .send(comment)
      .set('Accept', 'application/json')
      .expect(400)
      .expect((response) => {
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Could not add comment');
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

describe('Get Comments', () => {
  test('Should get all the comments', async (done) => {
    const { post1 } = await addToDatabase.createPosts();
    const comments = await addToDatabase.createComments(post1._id);
    request(app)
      .get(`/posts/${post1._id}/comments`)
      .set('Accept', 'application/json')
      .expect(200)
      .expect((response) => {
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Comments fetched');
        expect(response.body.comments.length).toBe(Object.keys(comments).length - 1);
      })
      .end((error) => {
        if (error) {
          return done(error);
        }
        return done();
      });
  });

  test('Should get all the comments by limit', async (done) => {
    const { post1 } = await addToDatabase.createPosts();
    await addToDatabase.createComments(post1._id);
    request(app)
      .get(`/posts/${post1._id}/comments?limit=1`)
      .set('Accept', 'application/json')
      .expect(200)
      .expect((response) => {
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Comments fetched');
        expect(response.body.comments.length).toBe(1);
      })
      .end((error) => {
        if (error) {
          return done(error);
        }
        return done();
      });
  });

  test('Should get the comments by skip', async (done) => {
    const { post1 } = await addToDatabase.createPosts();
    const comments = await addToDatabase.createComments(post1._id);
    request(app)
      .get(`/posts/${post1._id}/comments?skip=1`)
      .set('Accept', 'application/json')
      .expect(200)
      .expect((response) => {
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Comments fetched');
        const comment2 = JSON.parse(JSON.stringify(comments.comment2));
        expect(response.body.comments[0].comment).toBe(comment2.comment);
      })
      .end((error) => {
        if (error) {
          return done(error);
        }
        return done();
      });
  });

  test('Should return no comments if none exists', async (done) => {
    const { post1 } = await addToDatabase.createPosts();
    request(app)
      .get(`/posts/${post1._id}/comments`)
      .set('Accept', 'application/json')
      .expect(200)
      .expect((response) => {
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('No Comments found');
      })
      .end((error) => {
        if (error) {
          return done(error);
        }
        return done();
      });
  });
});
