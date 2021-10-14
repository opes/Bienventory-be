const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const Inventory = require('../lib/models/Inventory.js');
const User = require('../lib/models/Users.js');
const Menu = require('../lib/models/Menu.js');

describe('Bienventory-be menus routes', () => {
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
      phone_number: '+15038675309'
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
      user_id: '12345',
      meal_name: 'hashbrowns',
      ingredients: [
        { name: 'potatoes', quantity: 1 },
        { name: 'butter', quantity: 1 / 4 },
      ],
    };
    const res = await request(app).post('/api/v1/menus').send(hashbrowns);

    expect(res.body).toEqual({
      id: '1',
      user_id: '12345',
      meal_name: 'hashbrowns',
      ingredients: [
        JSON.stringify({ name: 'potatoes', quantity: 1 }),
        JSON.stringify({ name: 'butter', quantity: 1 / 4 }),
      ],
    });
  });

  it('gets a menu item by id using GET', async () => {
    await User.insert({
      google_id: '12345',
      notifications: true,
      phone_number: '+15038675309'
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
    const hashbrowns = await Menu.insert({
      user_id: '12345',
      meal_name: 'hashbrowns',
      ingredients: [
        { name: 'potatoes', quantity: 1 },
        { name: 'butter', quantity: 1 / 4 },
      ],
    });
    const res = await request(app).get(`/api/v1/menus/${hashbrowns.id}`);
    expect(res.body).toEqual(hashbrowns);
  });

  it('updates a menu item by id using PUT', async () => {
    await User.insert({
      google_id: '12345',
      notifications: true,
      phone_number: '+15038675309'
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
    const hashbrowns = await Menu.insert({
      user_id: '12345',
      meal_name: 'hashbrowns',
      ingredients: [
        { name: 'potatoes', quantity: 1 },
        { name: 'butter', quantity: 1 / 4 },
      ],
    });
    const res = await await request(app)
      .put(`/api/v1/menus/${hashbrowns.id}`)
      .send({
        ingredients: [
          { name: 'potatoes', quantity: 1 / 2 },
          { name: 'butter', quantity: 1 / 5 },
        ],
      });
    expect(res.body).toEqual({
      ...hashbrowns,
      ingredients: [
        JSON.stringify({ name: 'potatoes', quantity: 1 / 2 }),
        JSON.stringify({ name: 'butter', quantity: 1 / 5 }),
      ],
    });
  });
  it('gets all menu items using GET', async () => {
    await User.insert({
      google_id: '12345',
      notifications: true,
      phone_number: '+15038675309'
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
    const hashbrowns = await Menu.insert({
      user_id: '12345',
      meal_name: 'hashbrowns',
      ingredients: [
        { name: 'potatoes', quantity: 1 },
        { name: 'butter', quantity: 1 / 4 },
      ],
    });
    const mash = await Menu.insert({
      user_id: '12345',
      meal_name: 'mashed potatoes',
      ingredients: [
        { name: 'potatoes', quantity: 1 },
        { name: 'butter', quantity: 1 / 4 },
      ],
    });
    const res = await request(app).get('/api/v1/menus/');
    expect(res.body).toEqual([hashbrowns, mash]);
  });


});
