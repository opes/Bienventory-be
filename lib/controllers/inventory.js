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