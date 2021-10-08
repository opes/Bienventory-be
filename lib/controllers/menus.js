const { Router } = require('express');
const Menu = require('../models/Menu.js');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const newMenuItem = await Menu.insert(req.body);
      res.send(newMenuItem);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const menuItem = await Menu.getById(id);
      res.send(menuItem);
    } catch (error) {
      next(error);
    }
  });
