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


describe('Get a User', () => {
  test('should throw error for invalid userId value', async (done) => {
    request(app)
      .get('/users/xyz')
      .set('Accept', 'application/json')
      .expect(400)
      .expect(async (response) => {
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Invalid user id value');
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
