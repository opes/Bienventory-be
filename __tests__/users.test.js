const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');

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
});
