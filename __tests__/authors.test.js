const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('#GET /authors returns list of authors', async () => {
    const resp = await request(app).get('/books');
    expect(resp.body.length).toEqual(6);
  });

  it('#GET /authors:id returns a authors', async () => {
    const resp = await request(app).get('/authors/1');
    const authorOne = {
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
    expect(resp.body).toEqual(authorOne);
  });

  it('POST /author create new author', async () => {
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
