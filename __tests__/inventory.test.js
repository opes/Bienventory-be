const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const Inventory = require('../lib/models/Inventory.js');
const User = require('../lib/models/Users.js');

describe('Bienventory-be inventory routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creating a new inventory item with POST', async () => {
    await User.insert({
      google_id: '12345',
      notifications: true,
      phone_number: '+15038675309'
    });
    const newItem = {
      user_id: '12345',
      item_name: 'milk',
      description: 'its milk',
      total_on_hand: '4',
      par: 2,
      unit_type: 'gallons',
    };

    const res = await request(app).post('/api/v1/inventory').send(newItem);

    expect(res.body).toEqual({ id: '1', ...newItem });
  });

  it('gets an inventory item by id', async () => {
    await User.insert({
      google_id: '12345',
      notifications: true,
      phone_number: '+15038675309'
    });
    const newItem = {
      user_id: '12345',
      item_name: 'milk',
      description: 'its milk',
      total_on_hand: '4',
      par: 2,
      unit_type: 'gallons',
    };

    const newInventoryItem = await Inventory.insert(newItem);
    const res = await request(app).get(
      `/api/v1/inventory/${newInventoryItem.id}`
    );
    expect(res.body).toEqual(newInventoryItem);
  });

  it('gets all inventory items using GET', async () => {
    await User.insert({
      google_id: '12345',
      notifications: true,
      phone_number: '+15038675309'
    });

    const item1 = await Inventory.insert({
      user_id: '12345',
      item_name: 'milk',
      description: 'its milk',
      total_on_hand: 4,
      par: 2,
      unit_type: 'gallons',
    });

    const item2 = await Inventory.insert({
      user_id: '12345',
      item_name: 'potatoes',
      description: 'wots taters precious',
      total_on_hand: 10,
      par: 50,
      unit_type: 'pounds',
    });

    const item3 = await Inventory.insert({
      user_id: '12345',
      item_name: 'bacon',
      description: 'thick cut from hilshire farms',
      total_on_hand: 4,
      par: 10,
      unit_type: 'pounds',
    });

    const res = await request(app).get('/api/v1/inventory');

    expect(res.body).toEqual([item1, item2, item3]);
  });

  it('updates an inventory item by id with PUT', async () => {
    await User.insert({
      google_id: '12345',
      notifications: true,
      phone_number: '+15038675309'
    });

    const item1 = await Inventory.insert({
      user_id: '12345',
      item_name: 'milk',
      description: 'its milk',
      total_on_hand: '4',
      par: 2,
      unit_type: 'gallons',
    });

    const res = await request(app)
      .put(`/api/v1/inventory/${item1.id}`)
      .send({ total_on_hand: '3' });

    expect(res.body).toEqual({ ...item1, total_on_hand: '3' });
  });

  it('updates an inventory item by id with PUT', async () => {
    await User.insert({
      google_id: '12345',
      notifications: true,
      phone_number: '+15038675309'
    });

    const item1 = await Inventory.insert({
      user_id: '12345',
      item_name: 'milk',
      description: 'its milk',
      total_on_hand: 4,
      par: 2,
      unit_type: 'gallons',
    });

    const res = await request(app)
      .put(`/api/v1/inventory/${item1.id}`)
      .send({ description: 'whole milk from Belmont Dairy', par: 1 });

    expect(res.body).toEqual({
      ...item1,
      description: 'whole milk from Belmont Dairy',
      par: 1,
    });
  });

  it('deletes an item from the inventory', async () => {
    await User.insert({
      google_id: '12345',
      notifications: true,
      phone_number: '+15038675309'
    });

    const item1 = await Inventory.insert({
      user_id: '12345',
      item_name: 'milk',
      description: 'its milk',
      total_on_hand: 4,
      par: 2,
      unit_type: 'gallons',
    });
    const res = await request(app).delete(`/api/v1/inventory/${item1.id}`);

    expect(res.body).toEqual({
      message: `${item1.item_name} has been deleted`,
    });
  });
});
