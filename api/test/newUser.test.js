const mongoose = require('mongoose');
const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);
afterAll(() => mongoose.disconnect());
require('dotenv').config();
const User = require('../model/user.js');
let testUserId = "";


test('Invalid parameters', async () => {
    const response = await request.post('/api/new-user').send({ token: process.env.TOKEN });
    expect(response.status).toBe(200);
    expect(typeof response.body).toBe('object');
    expect(response.body.error).toMatch(/minimun required parameter/);
});

test('Mistake in parameter name', async () => {

    const response = await request.post('/api/new-user').send({ token: process.env.TOKEN, names: "some name" });
    expect(response.status).toBe(200);
    expect(response.body.error).toMatch(/minimun required parameter/);

});

test('inavalid parameter name value', async () => {

    const response = await request.post('/api/new-user').send({ token: process.env.TOKEN, name: "my/name'" });
    expect(response.status).toBe(200);
    expect(response.body.error).toMatch(/Invalid name value/);

});

test('Empty name', async () => {
    const response = await request.post('/api/new-user').send({ token: process.env.TOKEN, name: "", avatar: "http://myavatar.com" });
    expect(response.status).toBe(200);
    expect(response.body.error).toMatch(/Invalid name value/);
});

test('Valid insertion, but default avatar due to no avatar property', async () => {

    const response = await request.post('/api/new-user').send({ token: process.env.TOKEN, name: "Andres Bertuccio" });
    expect(response.status).toBe(200);
    expect(response.body.created.avatar).toMatch("https://api.adorable.io/avatars/285/abott@adorable.png");
    testUserId = response.body.created.userId;
});

test('Valid insertion, but default avatar due to empty avatar value', async () => {
    const response = await request.post('/api/new-user').send({ token: process.env.TOKEN, name: "Andres Bertuccio", avatar: "" });
    expect(response.status).toBe(200);
    expect(response.body.created.avatar).toMatch("https://api.adorable.io/avatars/285/abott@adorable.png");
    testUserId = response.body.created.userId;
});

test('valid insertion Custom avatar', async () => {

    const customAvatarURL = "http://myavatar.com";

    const response = await request.post('/api/new-user').send({ token: process.env.TOKEN, name: "Andres Bertuccio", avatar: customAvatarURL });
    expect(response.status).toBe(200);
    //TODO:chech created object
    expect(response.body.created.avatar).toMatch(customAvatarURL);
    testUserId = response.body.created.userId;
});

test('Invalid avatar URL', async () => {

    const customAvatarURL = "some invalid URL";

    const response = await request.post('/api/new-user').send({ token: process.env.TOKEN, name: "Andres Bertuccio", avatar: customAvatarURL });
    expect(response.status).toBe(200);
    expect(response.body.error).toMatch(/Invalid avatar value/);

});

afterEach(async () => {
    if (testUserId)
        await User.deleteOne({ _id: testUserId }).exec();
});