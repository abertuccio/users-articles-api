const mongoose = require('mongoose');
const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);
afterAll(() => mongoose.disconnect());
require('dotenv').config();

function pseudoName(){
    const len = Math.floor(Math.random() * 49) + 3;
    const spacePlace = Math.floor(len / 2);
    return [...Array(len)].map((e, i) =>
        (i === spacePlace) ? String.fromCharCode(32) :
            String.fromCharCode(97 + Math.floor(Math.random() * 26))
    ).join("");
}

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
    const response = await request.post('/api/new-user').send({ token: process.env.TOKEN, name: "", avatar:"http://myavatar.com" });
    expect(response.status).toBe(200);
    expect(response.body.error).toMatch(/Invalid name value/);
});

test('Valid parameters, but default avatar due to no avatar property', async () => {

    const response = await request.post('/api/new-user').send({ token: process.env.TOKEN, name: pseudoName() });
    expect(response.status).toBe(200);
    expect(response.body.created.avatar).toMatch("https://api.adorable.io/avatars/285/abott@adorable.png");

});

test('Valid parameters, but default avatar due to empty avatar value', async () => {

    const response = await request.post('/api/new-user').send({ token: process.env.TOKEN, name: pseudoName(), avatar:"" });
    expect(response.status).toBe(200);
    expect(response.body.created.avatar).toMatch("https://api.adorable.io/avatars/285/abott@adorable.png");

});

test('Custom avatar', async () => {

    const customAvatarURL = "http://myavatar.com"; 

    const response = await request.post('/api/new-user').send({ token: process.env.TOKEN, name: pseudoName(), avatar:customAvatarURL });
    expect(response.status).toBe(200);
    expect(response.body.created.avatar).toMatch(customAvatarURL);
    
});

test('Invalid avatar URL', async () => {

    const customAvatarURL = "some invalid URL"; 

    const response = await request.post('/api/new-user').send({ token: process.env.TOKEN, name: pseudoName(), avatar:customAvatarURL });
    expect(response.status).toBe(200);    
    expect(response.body.error).toMatch(/Invalid avatar value/);
    
});


