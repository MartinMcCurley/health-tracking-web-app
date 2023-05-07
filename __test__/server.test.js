const request = require('supertest');
const server = require('../server');

describe('GET /', () => {
  it('responds with "Hello World!"', async () => {
    const response = await request(server).get('/');
    expect(response.statusCode).toEqual(200);
    expect(response.text).toEqual('Hello World!');
  });
});

afterAll(async () => {
  // Close the server after running tests to avoid issues with Jest not exiting
  await server.close();
});
