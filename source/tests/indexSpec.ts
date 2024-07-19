import supertest from 'supertest';
import app from '../index';
import { promises as fs } from 'fs';
import path from 'path';
import File from '../image-functions';

const request = supertest(app);

describe('Testing API endpoints', () => {
  describe('GET /', () => {
    it('should return 200 OK', async () => {
      const response = await request.get('/');
      expect(response.status).toBe(200);
    });
  });

  describe('GET /api/images', () => {
    it('should return 200 for valid filename', async () => {
      const response = await request.get('/api/images?filename=fjord');
      expect(response.status).toBe(200);
    });

    it('should return 200 for valid filename, width, and height', async () => {
      const response = await request.get(
        '/api/images?filename=fjord&width=195&height=350'
      );
      expect(response.status).toBe(200);
    });

    it('should return 200 even for invalid width', async () => {
      const response = await request.get(
        '/api/images?filename=fjord&width=-200&height=6'
      );
      expect(response.status).toBe(200);
    });

    it('should return 200 for request without arguments', async () => {
      const response = await request.get('/api/images');
      expect(response.status).toBe(200);
    });
  });

  describe('GET /doesntexist', () => {
    it('should return 404 for invalid endpoint', async () => {
      const response = await request.get('/doesntexist');
      expect(response.status).toBe(404);
    });
  });
});

// Cleanup after tests
afterAll(async () => {
  const resizedImagePath = path.resolve(
    File.imagesThumbPath,
    'fjord-299x299.jpg'
  );

  try {
    await fs.unlink(resizedImagePath);
  } catch (err) {
    // Handle error if necessary
  }
});

// somehow all of this isnt returning an error, i thought i failed as a dev 😭
