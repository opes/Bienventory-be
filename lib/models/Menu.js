const pool = require('../utils/pool');

module.exports = class Menu {
  id;
  inventory_id;
  meal_name;
  ingredients;

  constructor(row) {
    this.id = row.id;
    this.inventory_id = row.inventory_id;
    this.meal_name = row.meal_name;
    this.ingredients = row.ingredients;
  }

  static async insert({ inventory_id, meal_name, ingredients }) {
    const { rows } = await pool.query(
      'INSERT INTO menus (inventory_id, meal_name, ingredients) VALUES ($1, $2, $3) RETURNING *',
      [inventory_id, meal_name, ingredients]
    );

    return new Menu(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * from menus WHERE id=$1', [id]);

    return new Menu(rows[0]);
  }

  static async updateById(id, { inventory_id, meal_name, ingredients }) {
    const existingMeal = await Menu.getById(id);
    const newInventoryId = inventory_id ?? existingMeal.inventory_id;
    const newMealName = meal_name ?? existingMeal.meal_name;
    const newIngredients = ingredients ?? existingMeal.ingredients;

    const { rows } = await pool.query(
      `
          UPDATE menus 
          SET
          inventory_id=$1,
          meal_name=$2,
          ingredients=$3
          WHERE id=$4
          RETURNING *
        `,
      [newInventoryId, newMealName, newIngredients, id]
    );

    return new Menu(rows[0]);
  }
};
