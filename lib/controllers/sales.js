const { Router } = require('express');
const UpdateInventory = require('../services/UpdateInventory');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const sales = await UpdateInventory.update(req.body);
    console.log(sales, 'SALES FROM CONTROLLER');
    res.send(sales);
  } catch (error) {
    next(error);
  }
});
