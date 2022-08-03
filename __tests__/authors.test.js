const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('#GET /authors returns list of authors', async () => {
    const resp = await request(app).get('/authors');
    expect(resp.body.length).toEqual(4);
  });

  it('#GET /authors:id returns a authors', async () => {
    const resp = await request(app).get('/authors/1');
    const authorOne = {
      books: [{
        id: 1,
        title: 'The Bitcoin Standard',
        released: 2018,
      },
      {
        id: 2,
        title: 'The Fiat Standard',
        released: 2022,
      }],
      dob: 'Not Found',
      id: '1',
      name: 'Saifedean Ammous',
      pob: 'Palestine'
    };
    expect(resp.body).toEqual(authorOne);
  });

  it('POST /authors create new author', async () => {
    const resp = await request(app)
      .post('/authors')
      .send({ name: 'Jordan Peterson', dob: '02-25-1960', pob: 'Canada' });
    expect(resp.body).toEqual({
      books: expect.any(Array),
      id: '5',
      name: 'Jordan Peterson',
      dob: '02-25-1960',
      pob: 'Canada'
    });
    console.log(resp.body);
  });

  afterAll(() => {
    pool.end();
  });
});
