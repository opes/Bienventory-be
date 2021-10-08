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