import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import testDbHelper from '../testUtils/testDbHelper';

describe('auth middleware', () => {
  test('should give 403 if token is not sent', async (done) => {
    const res = await request(app).get('/');
    expect(res.status).toBe(403);
    expect(res.body).toMatchObject({
      success: false,
      message: 'Token missing, please send the jwt token',
    });
    done();
  });
});

describe('Sign-up, sign-in, JWT generation and auth middleware', () => {
  beforeAll(async () => {
    await testDbHelper.createConnection();
  });

  afterAll(async () => {
    await testDbHelper.cleanup();
    await testDbHelper.closeConnection();
  });

  test('should return 400 on incorrect password format during signup', (done) => {
    const user = {
      id: mongoose.Types.ObjectId().toHexString(),
      name: 'test',
      email: 'test@test.com',
      password: 'P@sswrd',
    };
    request(app)
      .post('/auth/signup')
      .send(user)
      .expect((response) => {
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
      })
      .end(() => {
        done();
      });
  });

  test('should return a valid JWT on signup', (done) => {
    const user = {
      id: mongoose.Types.ObjectId().toHexString(),
      name: 'test',
      email: 'test@test.com',
      password: 'P@ssw0rd',
    };
    request(app)
      .post('/auth/signup')
      .send(user)
      .expect((response) => {
        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.user).toHaveProperty('token');
      })
      .end(() => {
        done();
      });
  });

  test('should return 400 signing up again with same email', (done) => {
    const user = {
      id: mongoose.Types.ObjectId().toHexString(),
      name: 'test',
      email: 'test@test.com',
      password: 'P@ssw0rd',
    };
    request(app)
      .post('/auth/signup')
      .send(user)
      .expect((response) => {
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
      })
      .end(() => {
        done();
      });
  });

  test('should return 400 on wrong email on signin', (done) => {
    const user = {
      email: 'a@test.com',
      password: 'P@ssw0rd',
    };
    request(app)
      .post('/auth/signin')
      .send(user)
      .expect((response) => {
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
      })
      .end((error) => {
        if (error) {
          done(error);
        }
        done();
      });
  });

  test('should return 400 on wrong password on signin', (done) => {
    const user = {
      email: 'a@test.com',
      password: '1234',
    };
    request(app)
      .post('/auth/signin')
      .send(user)
      .expect((response) => {
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
      })
      .end((error) => {
        if (error) {
          done(error);
        }
        done();
      });
  });

  let token;

  test('should return a valid JWT on signin', (done) => {
    const user = {
      email: 'test@test.com',
      password: 'P@ssw0rd',
    };
    request(app)
      .post('/auth/signin')
      .send(user)
      .expect((response) => {
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.user).toHaveProperty('token');
        token = response.body.user.token;
      })
      .end((error) => {
        if (error) {
          done(error);
        }
        done();
      });
  });

  test('should give 200 on protected route if token is sent', async (done) => {
    const res = await request(app)
      .get('/')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      success: true,
      message: '',
    });
    done();
  });
});
