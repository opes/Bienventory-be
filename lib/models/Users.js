const pool = require('../utils/pool');

module.exports = class User {
  google_id;
  notifications;

  constructor(row) {
    this.google_id = row.google_id;
    this.notifications = row.notifications;
  }

  static async insert({ google_id, notifications }) {
    const { rows } = await pool.query(
      'INSERT INTO users (google_id, notifications) VALUES ($1, $2) RETURNING *',
      [google_id, notifications]
    );

    return new User(rows[0]);
  }

  static async getById(google_id) {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE google_id=$1',
      [google_id]
    );

    return new User(rows[0]);
  }

  static async updateById(google_id, { notifications }) {
    const existingUser = await User.getById(google_id);
    const newNotifications = notifications ?? existingUser.notifications;
    const { rows } = await pool.query(
      'UPDATE users SET notifications=$1 WHERE google_id=$2 RETURNING *',[
        newNotifications, 
        google_id
      ]
    );

    return new User(rows[0]);
  }
};
