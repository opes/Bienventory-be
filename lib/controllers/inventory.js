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