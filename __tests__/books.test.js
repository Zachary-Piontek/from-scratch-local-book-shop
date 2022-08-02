const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('#GET /books returns list of books', async () => {
    const resp = await request(app).get('/books');
    expect(resp.body.length).toEqual(6);
  });

  it('#GET /books:id returns a book', async () => {
    const resp = await request(app).get('/books/1');
    console.log(resp.body);
    expect(resp.body).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      released: expect.any(Number),
    });
  });

  afterAll(() => {
    pool.end();
  });
});
