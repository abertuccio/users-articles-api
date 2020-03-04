const mongoose = require('mongoose');
const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);
afterAll(() => mongoose.disconnect());


test('Test wrong GET endpoint', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(404);
    expect(typeof response.body).toBe('object');
    expect(response.body.error).toMatch(/Invalid endpoint/);
});

test('Test wrong POST endpoint', async () => {
    const response = await request.post('/');
    expect(response.status).toBe(404);
    expect(typeof response.body).toBe('object');
    expect(response.body.error).toMatch(/Invalid endpoint/);
});

test('Test wrong endpoint', async () => {
    const response = await request.get('/whatever');
    expect(response.status).toBe(404);
    expect(typeof response.body).toBe('object');
    expect(response.body.error).toMatch(/Invalid endpoint/);
});

test('Test wrong endpoint /api/', async () => {
    const response = await request.get('/api/whatever');
    expect(response.status).toBe(404);
    expect(typeof response.body).toBe('object');
    expect(response.body.error).toMatch(/Invalid endpoint/);
});

test('Test wrong endpoint /api/wrong', async () => {
    const response = await request.get('/api/');
    expect(response.status).toBe(404);
    expect(typeof response.body).toBe('object');
    expect(response.body.error).toMatch(/Invalid endpoint/);
});

test('Test wrong request content-type', async () => {
    const response = await request.post('/api/new-user').send("some string");    
    expect(response.status).toBe(200);
    expect(typeof response.body).toBe('object');
    expect(response.body.error).toMatch(/content-type/);
});

test('Test no token', async () => {
    const response = await request.post('/api/new-user').send({name: 'john'});    
    expect(response.status).toBe(500);
    expect(typeof response.body).toBe('object');
});

test('Test wrong token format', async () => {
    const response = await request.post('/api/new-user').send({token: "a-$",name: 'john'});    
    expect(response.status).toBe(500);
    expect(typeof response.body).toBe('object');
});


