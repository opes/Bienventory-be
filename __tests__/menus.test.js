const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const Inventory = require('../lib/models/Inventory.js');
const User = require('../lib/models/Users.js');
const Menu = require('../lib/models/Menu.js');

describe('Bienventory-be inventory routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('adds a menu item using post', async () => {
    await User.insert({
        google_id: '12345',
        notifications: true,
      });
      await Inventory.insert({
        user_id: '12345',
        item_name: 'potatoes',
        description: 'wots taters precious',
        total_on_hand: 10,
        par: 50,
        unit_type: 'pounds',
      });
      await Inventory.insert({
        user_id: '12345',
        item_name: 'butter',
        description: 'unsalted butter',
        total_on_hand: 30,
        par: 4,
        unit_type: 'pounds',
      });
      const hashbrowns = {
          inventory_id: '1',
          meal_name: 'hashbrowns',
          ingredients: [{ name: 'potatoes', quantity: 1 }, { name: 'butter', quantity: 1/4 }]
      }
      const res = await request(app)
        .post('/api/v1/menus').send(hashbrowns);

        expect(res.body).toEqual({ id: '1', 
        inventory_id: '1',
        meal_name: 'hashbrowns',
        ingredients: [JSON.stringify({ name: 'potatoes', quantity: 1 }), JSON.stringify({ name: 'butter', quantity: 1/4 })] })
  })
});
