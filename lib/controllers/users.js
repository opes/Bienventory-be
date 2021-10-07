const { Router } = require('express');
const User = require('../models/Users.js');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const newUser = await User.insert(req.body); //req.body might contain unique_id instead of google_id
      res.send(newUser);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.getById(id);
      res.send(user);
    } catch (error) {
      next(error);
    }
  });
