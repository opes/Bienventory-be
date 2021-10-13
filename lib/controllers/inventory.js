const { Router } = require('express');
const Inventory = require('../models/Inventory.js');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const newItem = await Inventory.insert(req.body);
      res.send(newItem);
    } catch (error) {
      next(error);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const inventory = await Inventory.getById(id);
      res.send(inventory);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const inventory = await Inventory.getAll();
      res.send(inventory);
    } catch (error) {
      next(error);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { user_id, item_name, description, total_on_hand, par, unit_type } =
        req.body;
      const updatedItem = await Inventory.updateById(id, {
        user_id,
        item_name,
        description,
        total_on_hand,
        par,
        unit_type,
      });
      res.send(updatedItem);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const inventoryItem = await Inventory.deleteById(id);
      res.send({ message: `${inventoryItem.item_name} has been deleted` });
    } catch (error) {
      next(error);
    }
  })
  .get('/userInventory/:userId', async (req, res, next) => {
    try {
      const { userId } = req.params;
      const inventory = await Inventory.getInventoryByUserId(userId);
      res.send(inventory);
    } catch (error) {
      next(error);
    }
  });
