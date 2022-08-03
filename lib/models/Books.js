const pool = require('../utils/pool');

class Books {
  id;
  title;
  released;
  authors;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.released = row.released;
    this.authors = row.authors ?? [];
  }

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * FROM books'
    );
    // console.log(rows[0]);
    return rows.map((row) => new Books(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT 
        books.*, 
        COALESCE(
          json_agg(to_jsonb(authors))
          FILTER (WHERE authors.id IS NOT NULL), '[]'
      ) as authors from books 
        LEFT JOIN author_books_wrote on books.id = author_books_wrote.book_id 
        LEFT JOIN authors on author_books_wrote.author_id = authors.id
        WHERE books.id = $1
        GROUP BY books.id`,
      [id]
    );
    // console.log(rows[0]);
    return new Books(rows[0]);
  }

  static async insert({ title, released }) {
    const { rows } = await pool.query(
      'INSERT INTO books (title, released) VALUES ($1, $2) returning*;', [title, released]
    );
    // console.log(rows[0]);
    return new Books(rows[0]);
  }

}

module.exports = { Books };
