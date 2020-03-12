const mongoose = require('mongoose');
const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);
afterAll(() => mongoose.disconnect());
require('dotenv').config();
const User = require('../model/user');
const Article = require('../model/article');

const basicNewArticle = {
    articleId: '',
    userId: '',
    title: 'Some valid title',
    text: `Some valid text. Other text`,
    tags: ['mistery', 'comedy']
};

const basicNewArticle2 = {
    articleId: '',
    userId: '',
    title: 'Some valid title',
    text: `Some valid text. Other text`,
    tags: ['mistery', 'drama']
};

const basicNewArticle3 = {
    articleId: '',
    userId: '',
    title: 'Some valid title',
    text: `Some valid text. Other text`,
    tags: ['action']
};

beforeAll(async () => {
    const userRes = await request.post('/api/new-user').send({ token: process.env.TOKEN, name: "Test Name" });
    basicNewArticle.userId = userRes.body.created.userId;
    basicNewArticle2.userId = userRes.body.created.userId;
    basicNewArticle3.userId = userRes.body.created.userId;

    let articleRes = await request.post('/api/new-article').send({ token: process.env.TOKEN, ...basicNewArticle });
    
    basicNewArticle.articleId = articleRes.body.created.articleId;


    articleRes = await request.post('/api/new-article').send({ token: process.env.TOKEN, ...basicNewArticle2 });
    basicNewArticle2.articleId = articleRes.body.created.articleId;

    articleRes = await request.post('/api/new-article').send({ token: process.env.TOKEN, ...basicNewArticle3 });
    basicNewArticle3.articleId = articleRes.body.created.articleId;
});



test('Invalid verb', async () => {
    const response = await request.post('/api/all-articles').send({ token: process.env.TOKEN });
    expect(response.status).toBe(404);
    expect(typeof response.body).toBe('object');
    expect(response.body.error).toMatch(/Invalid endpoint/);
});

test('valid request', async () => {
    const response = await request.get('/api/all-articles?tags=1,2').send({ token: process.env.TOKEN });
    expect(response.status).toBe(200);
    expect(typeof response.body).toBe('object');
    expect(response.body.error).toMatch(/Invalid endpoint/);
});




afterAll(async () => {
    await User.deleteOne({ _id: basicNewArticle.userId }).exec();
    await Article.deleteOne({ _id: basicNewArticle.articleId }).exec();
    await Article.deleteOne({ _id: basicNewArticle2.articleId }).exec();
    await Article.deleteOne({ _id: basicNewArticle3.articleId }).exec();
});