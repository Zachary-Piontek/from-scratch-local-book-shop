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
    const bookOne = {
      authors: [{
        dob: 'Not Found',
        id: 1,
        name: 'Saifedean Ammous',
        pob: 'Palestine'
      }],
      id: '1',
      title: 'The Bitcoin Standard',
      released: 2018,
    };
    expect(resp.body).toEqual(bookOne);
  });

  it('POST /books create new book', async () => {
    const resp = await request(app)
      .post('/books')
      .send({ title: '10,000 Hours of Coding', released: 2022 });
    expect(resp.body).toEqual({
      authors: expect.any(Array),
      id: '7',
      title: '10,000 Hours of Coding',
      released: 2022,
    });
  });

  afterAll(() => {
    pool.end();
  });
});
