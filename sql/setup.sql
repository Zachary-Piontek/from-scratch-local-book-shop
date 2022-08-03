-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS author_books_wrote; --error look up CASCADE and what is does?
DROP TABLE IF EXISTS authors;
DROP TABLE IF EXISTS books;

CREATE TABLE authors (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR,
    dob VARCHAR,
    pob VARCHAR
);

CREATE TABLE books (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR NOT NULL,
    released INT NOT NULL
);

CREATE TABLE author_books_wrote(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    author_id BIGINT,
    book_id BIGINT,
    FOREIGN KEY (author_id) REFERENCES authors(id),
    FOREIGN KEY (book_id) REFERENCES books(id)
);


INSERT INTO authors (
    name,
    dob,
    pob
)
VALUES 
    ('Saifedean Ammous', 'Not Found', 'Palestine'),
    ('Aldous Huxley', '07-26-1894', 'Godalming, Surrey, England'),
    ('George Orwell', '06-25-1903', 'Motihari, Bengal Presidency, British India'),
    ('Malcolm Gladwell', '09-03-1963', 'Fareham, England, UK')
;


INSERT INTO books (
    title,
    released
)
VALUES 
    ('The Bitcoin Standard', 2018),
    ('The Fiat Standard', 2022),
    ('Brave New World', 1932),
    ('Animal Farm', 1945),
    ('Nineteen Eighty-Four', 1949),
    ('Outliers', 2008)
;


INSERT INTO author_books_wrote (author_id, book_id) VALUES
    (1,1),
    (1,2),
    (2,3),
    (3,4),
    (3,5),
    (4,6)
;