const Inventory = require('../models/Inventory');
const Sale = require('../models/Sale');
const Menu = require('../models/Menu');
const { sendText } = require('../utils/twilio');

module.exports = class UpdateInventory {
  static async update(salesArray) {
    const menu = await Menu.getAll();
    const inventory = await Inventory.getAll();
    salesArray.map(sale => {
      const mealNames = menu.find(name => name.meal_name === sale.name);
      const amounts = mealNames.ingredients.map(ingredient => ingredient.quantiy * sale.quantiy);
      const InventoryItems = inventory.find(item => item.item_name === menu.ingreients.name);
      

    });
  }
};
