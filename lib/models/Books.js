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
    return new Books(rows[0]);
  }
}

module.exports = { Books };
