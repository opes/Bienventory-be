const { Router } = require('express');
const { textOnUpdate } = require('../services/UpdateInventory');
const UpdateInventory = require('../services/UpdateInventory');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const sales = await UpdateInventory.update(req.body[0]);
    const notification = await textOnUpdate(req.body[1]);
    res.send(sales, notification);
  } catch (error) {
    next(error);
  }
});
