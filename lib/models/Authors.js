const pool = require('../utils/pool');

class Authors {
  id;
  name;
  dob;
  pob;
  books;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.dob = row.dob;
    this.pob = row.pob;
    this.books = row.books ?? [];
  }

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * FROM authors'
    );
    // console.log(rows[0]);
    return rows.map((row) => new Authors(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT 
        authors.*, 
        COALESCE(
          json_agg(to_jsonb(books))
          FILTER (WHERE books.id IS NOT NULL), '[]'
      ) as books from authors 
        LEFT JOIN author_books_wrote on authors.id = author_books_wrote.author_id 
        LEFT JOIN books on author_books_wrote.book_id = books.id
        WHERE authors.id = $1
        GROUP BY authors.id`,
      [id]
    );
    // console.log(rows[0]);
    return new Authors(rows[0]);
  }

  static async insert({ name, dob, pob }) {
    const { rows } = await pool.query(
      'INSERT INTO authors (name, dob, pob) VALUES ($1, $2, $3) returning*;',
      [name, dob, pob]
    );
    // console.log(rows[0]);
    return new Authors(rows[0]);
  }

}

module.exports = { Authors };
