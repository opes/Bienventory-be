const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const User = require('../lib/models/Users.js');

describe('Bienventory-be users routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('inserts a user into the users table with POST', async () => {
    const newUser = {
      google_id: '12345',
      notifications: true,
    };

    const res = await request(app).post('/api/v1/users').send(newUser);

    expect(res.body).toEqual(newUser);
  });

  it('gets a user by Google id', async () => {
    const newUser = {
      google_id: '12345',
      notifications: true,
    };
    const user = await User.insert(newUser)
    const res = await request(app).get(`/api/v1/users/${user.google_id}`);

    expect(res.body).toEqual(user);
  })
});
