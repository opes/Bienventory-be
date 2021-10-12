const Inventory = require('../models/Inventory');
const Sale = require('../models/Sale');
const Menu = require('../models/Menu');
const User = require('../models/Users');
const { sendText } = require('../utils/twilio');
const dummyData = async () => {
  const newUser = {
    google_id: '12345',
    notifications: true,
    phone_number: '+15038675309',
  };
  await User.insert(newUser);
  await Inventory.insert({
    user_id: '12345',
    item_name: 'potatoes',
    description: 'wots taters precious',
    total_on_hand: 10,
    par: 50,
    unit_type: 'pounds',
  });
  await Inventory.insert({
    user_id: '12345',
    item_name: 'butter',
    description: 'unsalted butter',
    total_on_hand: 30,
    par: 4,
    unit_type: 'pounds',
  });
  const hashbrowns = await Menu.insert({
    inventory_id: '1',
    meal_name: 'hashbrowns',
    ingredients: [
      { name: 'potatoes', quantity: 1 },
      { name: 'butter', quantity: 1 / 4 },
    ],
  });
  const mashedPotatoes = await Menu.insert({
    inventory_id: '1',
    meal_name: 'mashedpotatoes',
    ingredients: [
      { name: 'potatoes', quantity: 1 },
      { name: 'butter', quantity: 1 / 4 },
    ],
  });
};
module.exports = class UpdateInventory {
  static async update(salesArray) {
    //await dummyData();
    const menu = await Menu.getAll();
    console.log(menu, 'MENU');
    const inventory = await Inventory.getAll();
    console.log(inventory, 'INVENTORY');
    console.log(salesArray, 'SALES ARRAY');
    return Promise.all(salesArray.sales.map((sale) => {
      console.log(sale, 'SALE');
      const mealNames = menu.find((name) => name.meal_name === sale.name);
      const amounts = mealNames.ingredients.map(async (ingredient) => {
        const parsedIngredient = JSON.parse(ingredient);
        const parsedName = parsedIngredient.name;
        const reduction = parsedIngredient.quantity * sale.quantity;
        const inventoryItems = inventory.find(
          (item) => item.item_name === parsedName
        );
        console.log(inventoryItems, 'INVENTORY ITEMS');
        const updated = await Inventory.updateById(inventoryItems.id, {
          total_on_hand: inventoryItems.total_on_hand - reduction,
        });
        console.log(updated, 'UPDATED');
        return updated;
      });

      return Promise.all(amounts);
    }));
  }
};
