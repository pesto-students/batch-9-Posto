import request from 'supertest';
import addToDatabase from '../testUtils/addToDatabase';
import testDbHelper from '../testUtils/testDbHelper';
import app from '../../src/app';
import config from '../../src/config';

beforeAll(async () => {
  await testDbHelper.createConnection();
});

afterAll(async () => {
  await testDbHelper.closeConnection();
});

afterEach(async () => {
  await testDbHelper.cleanup();
});


describe('Get Categories', () => {
  test('should fetch a list of categories', async (done) => {
    const categories = await addToDatabase.createCategories();
    request(app)
      .get('/categories')
      .query({ bypasstoken: config.BYPASS_TOKEN })
      .set('Accept', 'application/json')
      .expect(200)
      .expect(async (response) => {
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Categories fetched');
        expect(response.body.categories.length).toEqual(categories.length);
      })
      .end((error) => {
        if (error) {
          return done(error);
        }
        return done();
      });
  });
});
