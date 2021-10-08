const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const User = require('../lib/models/Users.js');

describe('Bienventory-be inventory routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

it('creating a new inventory item with POST', async () => {
    const newUser = User.insert({
        google_id: '12345',
        notifications: true,
      });
    const newItem = {
        user_id: '12345',
        item_name: 'milk',
        description: 'its milk',
        total_on_hand: 4,
        par: 2,
        unit_type: 'gallons'
    };

    const res = await request(app).post('/api/v1/inventory').send(newItem);

    expect(res.body).toEqual({ id: '1', ...newItem });
});

it('gets an inventory item by id', async () => {
    const newItem = {
        user_id: '12345',
        item_name: 'milk',
        description: 'its milk',
        total_on_hand: 4,
        par: 2,
        unit_type: 'gallons'
    };

    const newInventoryItem = await Inventory.insert(newItem);
    const res = await request(app).get(`/api/v1/inventory/${newInventoryItem.id}`);
    expect(res.body).toEqual(newInventoryItem);
})
})