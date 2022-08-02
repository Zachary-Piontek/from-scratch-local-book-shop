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

  afterAll(() => {
    pool.end();
  });
});
