const pool = require('../utils/pool');

class Books {
  id;
  title;
  released;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.released = row.released;
  }

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * FROM books'
    );
    console.log(rows[0]);
    return rows.map((row) => new Books(row));
  }
}

module.exports = { Books };
