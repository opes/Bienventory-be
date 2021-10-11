// const pool = require('../utils/pool');

// module.exports = class Sale {
//   id;
//   menu_id;
//   sales;

//   constructor(row) {
//     this.id = row.id;
//     this.menu_id = row.menu_id;
//     this.sales = row.sales;
//   }

//   static async insert({ menu_id, sales }) {
//     const { rows } = await pool.query(
//       `
//           INSERT INTO sales
//           (menu_id, sales)  
//           VALUES
//           ($1, $2)
//           RETURNING *
//         `,
//       [menu_id, sales]
//     );

//     return new Sale(rows[0]);
//   }
// };
