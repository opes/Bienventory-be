const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const Inventory = require('../lib/models/Inventory.js');
const User = require('../lib/models/Users.js');
const Menu = require('../lib/models/Menu.js');
const twilio = require('../lib/utils/twilio.js');

jest.mock('../lib/utils/twilio.js');

describe('Bienventory-be menus routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it.skip('posts new sales data, updates inventory, and sends a text', async () => {
    const newUser = {
      google_id: '12345',
      notifications: true,
      phone_number: '+15038675309',
    };
    await User.insert(newUser);
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
    const hashbrowns = await Menu.insert({
      inventory_id: '1',
      meal_name: 'hashbrowns',
      ingredients: [
        { name: 'potatoes', quantity: 1 },
        { name: 'butter', quantity: 1 / 4 },
      ],
    });
    const mashedPotatoes = await Menu.insert({
      inventory_id: '1',
      meal_name: 'mashedpotatoes',
      ingredients: [
        { name: 'potatoes', quantity: 1 },
        { name: 'butter', quantity: 1 / 4 },
      ],
    });
    const sales = {
      menu_id: '1',
      sales: [{ name: 'hashbrowns', quantity: '2' }, { name: 'mashedpotatoes', quantity: '3' }],
    };
    const res = await request(app).post('/api/v1/sales').send(sales);
    // expect(twilio.sendText).toHaveBeenCalledTimes(1);
    expect(res.body).toEqual({
      id: '1',
      ...sales,
    });
  });
});
