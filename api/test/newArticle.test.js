const mongoose = require("mongoose");
const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);
afterAll(() => mongoose.disconnect());
require("dotenv").config();
const User = require("../model/user.js");
const Article = require("../model/article");

const basicNewArticle = {
  userId: "",
  title: "Some valid title",
  text: `Some valid text.
           other text`,
  tags: ["mistery", "comedy"]
};
let createdArticleId = "";

beforeAll(async () => {
  const req = await request
    .post("/api/new-user")
    .send({ token: process.env.TOKEN, name: "New test Name" });
  basicNewArticle.userId = req.body.created.userId;
});

test("Invalid parameters", async () => {
  const response = await request
    .post("/api/new-article")
    .send({ token: process.env.TOKEN });
  expect(response.status).toBe(200);
  expect(typeof response.body).toBe("object");
  expect(response.body.error).toMatch(/minimun required parameter/);
});

test("inavalid userId", async () => {
  const article = { ...basicNewArticle };
  article.userId = "---!";

  const response = await request
    .post("/api/new-article")
    .send({ token: process.env.TOKEN, ...article });
  expect(response.status).toBe(200);
  expect(response.body.error).toMatch(/Invalid userId/);
});

test("inavalid title", async () => {
  const article = { ...basicNewArticle };
  article.title = `---
    ...`;

  const response = await request
    .post("/api/new-article")
    .send({ token: process.env.TOKEN, ...article });
  expect(response.status).toBe(200);
  expect(response.body.error).toMatch(/Invalid title/);
});

test("inavalid text", async () => {
  const article = { ...basicNewArticle };
  article.text = `---
    mm,`;

  const response = await request
    .post("/api/new-article")
    .send({ token: process.env.TOKEN, ...article });
  expect(response.status).toBe(200);
  expect(response.body.error).toMatch(/Invalid text/);
});

test("inavalid tags format", async () => {
  const article = JSON.parse(JSON.stringify(basicNewArticle));
  article.tags = "some invalid array";

  const response = await request
    .post("/api/new-article")
    .send({ token: process.env.TOKEN, ...article });
  expect(response.status).toBe(200);
  expect(response.body.error).toMatch(/Invalid tags/);
});

test("inavalid tag", async () => {
  const article = JSON.parse(JSON.stringify(basicNewArticle));
  article.tags = ["valid", "no spaces"];

  const response = await request
    .post("/api/new-article")
    .send({ token: process.env.TOKEN, ...article });
  expect(response.status).toBe(200);
  expect(response.body.error).toMatch(/Invalid tags/);
});

test("inavalid user", async () => {
  const article = { ...basicNewArticle };
  article.userId = "555555555555555555555555";

  const response = await request
    .post("/api/new-article")
    .send({ token: process.env.TOKEN, ...article });
  expect(response.status).toBe(200);
  expect(response.body.error).toMatch(/Invalid user/);
});

test("valid article", async () => {
  const article = { ...basicNewArticle };

  const response = await request
    .post("/api/new-article")
    .send({ token: process.env.TOKEN, ...article });
  expect(response.status).toBe(200);
  //TODO:chech created object
  expect(response.body.error).toBe("");
  expect(response.body.valid).toBe(true);

  createdArticleId = response.body.created.articleId;
});

//TODO: remove articles created
afterAll(async () => {
  await User.deleteOne({ _id: basicNewArticle.userId }).exec();
});

afterEach(async () => {
  if (createdArticleId)
    await Article.deleteOne({ _id: createdArticleId }).exec();
});
