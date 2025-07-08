jest.mock('axios');
const axios = require('axios');
const request = require('supertest');
const app = require('../src/server');
const pool = require('../src/connection');

beforeAll(async () => {
  await pool.query('DELETE FROM books;');
});

afterAll(() => pool.end());

describe('Library API', () => {
  describe('GET /api/library', () => {
    it('responds 200 with an array', () => {
      return request(app)
        .get('/api/library')
        .expect(200)
        .then(({ body }) => {
          if (!Array.isArray(body.books)) {
            throw new Error('Expected body.books to be an array');
          }
        });
    });
  });

  describe('POST /api/library', () => {
    it('creates a new book using mocked Google Books data', async () => {
      // Mock the Google Books API response
      axios.get.mockResolvedValue({
        data: {
          volumeInfo: {
            title: 'Mocked Title',
            authors: ['Mock Author'],
            publishedDate: '2021-01-01',
            infoLink: 'http://example.com',
            description: 'Mock description',
            pageCount: 123,
            imageLinks: { thumbnail: 'http://img' },
            categories: ['MockGenre']
          }
        }
      });

      const res = await request(app)
        .post('/api/library')
        .send({ google_id: 'ANY_ID', tags: ['X'], status: 'not_started' })
        .expect(201);

      expect(res.body.book).toMatchObject({
        title: 'Mocked Title',
        authors: ['Mock Author'],
        page_count: 123,
        categories: ['MockGenre']
      });
    });
  });

  describe('PATCH /api/library/:id', () => {
    it('updates a book status', async () => {
      const post = await request(app)
        .post('/api/library')
        .send({ google_id: 'XYZ', title: 'Patch Me', authors: ['Me'] });
      const id = post.body.book.id;

      return request(app)
        .patch(`/api/library/${id}`)
        .send({ status: 'reading' })
        .expect(200)
        .then(({ body }) => {
          if (body.book.status !== 'reading') {
            throw new Error('Status not updated');
          }
        });
    });
  });

  describe('DELETE /api/library/:id', () => {
    it('removes a book', async () => {
      const post = await request(app)
        .post('/api/library')
        .send({ google_id: 'DEL', title: 'Delete Me', authors: ['Me'] });
      const id = post.body.book.id;

      return request(app)
        .delete(`/api/library/${id}`)
        .expect(204);
    });
  });
});