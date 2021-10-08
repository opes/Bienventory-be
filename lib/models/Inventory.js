const pool = require('../utils/pool');

module.exports = class Inventory {
    id;
    user_id;
    item_name;
    description;
    total_on_hand;
    par;
    unit_type;

    constructor(row) {
        this.id = row.id;
        this.user_id = row.user_id;
        this.item_name = row.item_name;
        this.description = row.description;
        this.total_on_hand = row.total_on_hand;
        this.par = row.par;
        this.unit_type = row.unit_type;
    }

    static async insert({ user_id, item_name, description, total_on_hand, par, unit_type }) {
        const { rows } = await pool.query('INSERT INTO inventory (user_id, item_name, description, total_on_hand, par, unit_type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [user_id, item_name, description, total_on_hand, par, unit_type]);
        return new Inventory(rows[0]);
    }
}