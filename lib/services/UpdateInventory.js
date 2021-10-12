const Inventory = require('../models/Inventory');
const Sale = require('../models/Sale');
const Menu = require('../models/Menu');
//const User = require('../models/Users');
const { sendText } = require('../utils/twilio');

module.exports = class UpdateInventory {
  static async update(salesArray) {
    await Sale.insert(salesArray);
    return Promise.all(
      salesArray.sales.map(async (sale) => {
        const menu = await Menu.getAll();
        const inventory = await Inventory.getAll();
        const mealName = menu.find((name) => name.meal_name === sale.name);
        let i = 0;
        while (mealName.ingredients[i]) {
          const parsedIngredient = JSON.parse(mealName.ingredients[i]);
          const parsedName = parsedIngredient.name;
          const reduction = parsedIngredient.quantity * sale.quantity;
          const inventoryItems = inventory.find(
            (item) => item.item_name === parsedName
          );
          await Inventory.updateById(inventoryItems.id, {
            total_on_hand: inventoryItems.total_on_hand - reduction,
          });
          i++;
          // return updated;
        }
      })
    );
  }
  static async textOnUpdate(phoneNumber) {
    await sendText(
      phoneNumber,
      'Inventory has been updated to reflect recent sales data, check your Bienventory app to see most recent inventory'
    );
  }
};
