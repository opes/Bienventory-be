const Inventory = require('../models/Inventory');
const Sale = require('../models/Sale');
const Menu = require('../models/Menu');
const { sendText } = require('../utils/twilio');
const { ConversationList } = require('twilio/lib/rest/conversations/v1/conversation');

module.exports = class UpdateInventory {
  static async update(salesArray) {
    const menu = await Menu.getAll();
    const inventory = await Inventory.getAll();
    console.log(salesArray);
    salesArray.sales.map((sale) => {
      const mealNames = menu.find(name => name.meal_name === sale.name);
      const amounts = mealNames.ingredients.map(async (ingredient) => {
        const parsedIngredient = JSON.parse(ingredient);
        const parsedName = parsedIngredient.name;
        const reduction = parsedIngredient.quantity * sale.quantity;
        const inventoryItems = inventory.find(item => item.item_name === inventory.name);
        console.log(inventoryItems);
        const updated = await Inventory.updateById(inventoryItems.id, { total_on_hand: inventoryItems.total_on_hand - reduction });
      });
    })
  }
};
