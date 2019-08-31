import request from 'supertest';
import addToDatabase from '../testUtils/addToDatabase';
import userModel from '../../src/models/User';
import testDbHelper from '../testUtils/testDbHelper';
import app from '../../src/app';

beforeAll(async () => {
  await testDbHelper.createConnection();
});

afterAll(async () => {
  await testDbHelper.closeConnection();
});

afterEach(async () => {
  await testDbHelper.cleanup();
});


describe('Get a User', () => {
  test('should throw error for invalid userId value', async (done) => {
    request(app)
      .get('/users/xyz')
      .set('Accept', 'application/json')
      .expect(400)
      .expect(async (response) => {
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('userId should be a valid object id');
      })
      .end((error) => {
        if (error) {
          return done(error);
        }
        return done();
      });
  });

  test('should get a user', async (done) => {
    const { user1 } = await addToDatabase.createUsers();
    request(app)
      .get(`/users/${user1._id}`)
      .set('Accept', 'application/json')
      .expect(200)
      .expect((response) => {
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('User found');
      })
      .end((error) => {
        if (error) {
          return done(error);
        }
        return done();
      });
  });

  test('should return user not found', async (done) => {
    request(app)
      .get('/users/5d5adea00f61796594c32dec')
      .set('Accept', 'application/json')
      .expect(200)
      .expect((response) => {
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('User not found');
      })
      .end((error) => {
        if (error) {
          return done(error);
        }
        return done();
      });
  });
});


describe('Update a User', () => {
  test('should update an existing user', async (done) => {
    const { user1 } = await addToDatabase.createUsers();
    const updateUserBody = {
      gender: 'Male',
      DOB: '2019-08-19T17:38:35.000Z',
      email: 'sumeet@gmail.com',
      name: 'sumeet',
    };
    request(app)
      .put(`/users/${user1._id}`)
      .send(updateUserBody)
      .set('Accept', 'application/json')
      .expect(200)
      .expect(async (response) => {
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('User updated successfully');
        const user = await userModel.findById(user1._id);
        const userObject = JSON.parse(JSON.stringify(user));
        expect(userObject).toMatchObject(updateUserBody);
      })
      .end((error) => {
        if (error) {
          return done(error);
        }
        return done();
      });
  });


  test('should throw Joi validation errors', async (done) => {
    const { user1 } = await addToDatabase.createUsers();
    const updateUserBody = {};
    request(app)
      .put(`/users/${user1._id}`)
      .send(updateUserBody)
      .set('Accept', 'application/json')
      .expect(400)
      .expect((response) => {
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Could not update user');
        expect(response.body.isJoi).toBe(true);
      })
      .end((error) => {
        if (error) {
          return done(error);
        }
        return done();
      });
  });

  test('should throw error for invalid userId value', async (done) => {
    const updateUserBody = {};
    request(app)
      .put('/users/xyz')
      .send(updateUserBody)
      .set('Accept', 'application/json')
      .expect(400)
      .expect((response) => {
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('userId should be a valid object id');
      })
      .end((error) => {
        if (error) {
          return done(error);
        }
        return done();
      });
  });

  test('should throw error for document not in collection', async (done) => {
    await addToDatabase.createUsers();
    const updateUserBody = {
      gender: 'Male',
      DOB: '2019-08-19T17:38:35.000Z',
      email: 'sumeet@gmail.com',
      name: 'sumeet',
    };
    request(app)
      .put('/users/5d5adea00f61796594c32deb')
      .send(updateUserBody)
      .set('Accept', 'application/json')
      .expect(200)
      .expect((response) => {
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('User could not be updated');
      })
      .end((error) => {
        if (error) {
          return done(error);
        }
        return done();
      });
  });
});
