const mongoose = require('mongoose');
const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);


test('Test wrong endpoint', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(404);
    expect(typeof response.body).toBe('object');
    expect(response.body.error).toMatch(/Invalid endpoint/);
});


afterAll(() => mongoose.disconnect());