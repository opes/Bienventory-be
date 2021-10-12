const Inventory = require('../models/Inventory');
const Sale = require('../models/Sale');
const Menu = require('../models/Menu');
const User = require('../models/Users');
const { sendText } = require('../utils/twilio');
// const dummyData = async () => {
//   const newUser = {
//     google_id: '12345',
//     notifications: true,
//     phone_number: '+15038675309',
//   };
//   await User.insert(newUser);
//   // await Inventory.insert({
//   //   user_id: '12345',
//   //   item_name: 'potatoes',
//   //   description: 'wots taters precious',
//   //   total_on_hand: 10,
//   //   par: 50,
//   //   unit_type: 'pounds',
//   // });
//   // await Inventory.insert({
//   //   user_id: '12345',
//   //   item_name: 'butter',
//   //   description: 'unsalted butter',
//   //   total_on_hand: 30,
//   //   par: 4,
//   //   unit_type: 'pounds',
//   // });
//   await Menu.insert({
//     inventory_id: '1',
//     meal_name: 'hashbrowns',
//     ingredients: [
//       { name: 'potatoes', quantity: 1 },
//       { name: 'butter', quantity: 1 / 4 },
//     ],
//   });
//   const mashedPotatoes = await Menu.insert({
//     inventory_id: '1',
//     meal_name: 'mashedpotatoes',
//     ingredients: [
//       { name: 'potatoes', quantity: 1 },
//       { name: 'butter', quantity: 1 / 4 },
//     ],
//   });
// };
// module.exports = class UpdateInventory {
//   static async update(salesArray) {
//     // await dummyData();
//     await Sale.insert(salesArray);
//     return Promise.all(salesArray.sales.map(async (sale) => {
//       const menu = await Menu.getAll();
//       const inventory = await Inventory.getAll();
//       console.log(inventory);
//       const mealName = menu.find((name) => name.meal_name === sale.name);

//       const amounts = mealName.ingredients.map(async (ingredient) => {
//         const parsedIngredient = JSON.parse(ingredient);
//         const parsedName = parsedIngredient.name;
//         const reduction = parsedIngredient.quantity * sale.quantity;
//         const inventoryItems = inventory.find(
//           (item) => item.item_name === parsedName
//         );
//         const updated = await Inventory.updateById(inventoryItems.id, {
//           total_on_hand: inventoryItems.total_on_hand - reduction,
//         });
//         // console.log(inventoryItems, 'ITEMS');
//         // console.log(updated)
//         return updated;
//       });

//       return Promise.all(amounts);
//     }));
//   }
// };

module.exports = class UpdateInventory {
  static async update(salesArray) {
    // await dummyData();
    await Sale.insert(salesArray);
    return Promise.all(salesArray.sales.map(async (sale) => {
      const menu = await Menu.getAll();
      const inventory = await Inventory.getAll();
      console.log(inventory);
      const mealName = menu.find((name) => name.meal_name === sale.name);
      let i = 0;
      while (mealName.ingredients[i]) {
          const parsedIngredient = JSON.parse(mealName.ingredients[i]);
          const parsedName = parsedIngredient.name;
          const reduction = parsedIngredient.quantity * sale.quantity;
          const inventoryItems = inventory.find(
            (item) => item.item_name === parsedName
          );
          const updated = await Inventory.updateById(inventoryItems.id, {
            total_on_hand: inventoryItems.total_on_hand - reduction,
          });
          // console.log(inventoryItems, 'ITEMS');
          i++;
          // return updated;
      }
    }));
  }
};
