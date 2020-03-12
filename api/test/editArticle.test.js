const mongoose = require("mongoose");
const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);
afterAll(() => mongoose.disconnect());
require("dotenv").config();
const User = require("../model/user");
const Article = require("../model/article");

const basicNewArticle = {
  articleId: "",
  userId: "",
  title: "Some valid title",
  text: `Some valid text. Other text`,
  tags: ["mistery", "comedy"]
};
let invalidUserId = "";

beforeAll(async () => {
  const userRes = await request
    .post("/api/new-user")
    .send({ token: process.env.TOKEN, name: "Name f" });
  basicNewArticle.userId = userRes.body.created.userId;

  const invalidUserRes = await request
    .post("/api/new-user")
    .send({ token: process.env.TOKEN, name: "Name g" });
  invalidUserId = invalidUserRes.body.created.userId;

  const ArticleRes = await request
    .post("/api/new-article")
    .send({ token: process.env.TOKEN, name: "Name h", ...basicNewArticle });
  basicNewArticle.articleId = ArticleRes.body.created.articleId;
});

test("Invalid parameters", async () => {
  const response = await request
    .post("/api/edit-article")
    .send({ token: process.env.TOKEN });
  expect(response.status).toBe(200);
  expect(typeof response.body).toBe("object");
  expect(response.body.error).toMatch(/minimun required parameter/);
});

test("inavalid userId", async () => {
  const article = { ...basicNewArticle };
  article.userId = "---!";

  const response = await request
    .post("/api/edit-article")
    .send({ token: process.env.TOKEN, ...article });
  expect(response.status).toBe(200);
  expect(response.body.error).toMatch(/Invalid userId/);
});

test("inavalid title", async () => {
  const article = { ...basicNewArticle };
  article.title = `---
    ...`;

  const response = await request
    .post("/api/edit-article")
    .send({ token: process.env.TOKEN, ...article });
  expect(response.status).toBe(200);
  expect(response.body.error).toMatch(/Invalid title/);
});

test("inavalid text", async () => {
  const article = { ...basicNewArticle };
  article.text = `---
    mm,`;

  const response = await request
    .post("/api/edit-article")
    .send({ token: process.env.TOKEN, ...article });
  expect(response.status).toBe(200);
  expect(response.body.error).toMatch(/Invalid text/);
});

test("inavalid tags format", async () => {
  const article = JSON.parse(JSON.stringify(basicNewArticle));
  article.tags = "some invalid array";

  const response = await request
    .post("/api/edit-article")
    .send({ token: process.env.TOKEN, ...article });
  expect(response.status).toBe(200);
  expect(response.body.error).toMatch(/Invalid tags/);
});

test("inavalid tag", async () => {
  const article = JSON.parse(JSON.stringify(basicNewArticle));
  article.tags = ["valid", "no spaces"];

  const response = await request
    .post("/api/edit-article")
    .send({ token: process.env.TOKEN, ...article });
  expect(response.status).toBe(200);
  expect(response.body.error).toMatch(/Invalid tags/);
});

test("inavalid user", async () => {
  const article = { ...basicNewArticle };
  article.userId = "555555555555555555555555";

  const response = await request
    .post("/api/edit-article")
    .send({ token: process.env.TOKEN, ...article });
  expect(response.status).toBe(200);
  expect(response.body.error).toMatch(/Invalid user/);
});

test("article does not exist", async () => {
  const article = { ...basicNewArticle };
  article.articleId = "555555555555555555555555";

  const response = await request
    .post("/api/edit-article")
    .send({ token: process.env.TOKEN, ...article });

  expect(response.status).toBe(200);
  expect(response.body.error).toMatch(/not exist/);
});

test("wrong owner article", async () => {
  const article = { ...basicNewArticle };
  article.userId = invalidUserId;

  const response = await request
    .post("/api/edit-article")
    .send({ token: process.env.TOKEN, ...article });

  expect(response.status).toBe(200);
  expect(response.body.error).toMatch(/not the owner/);
});

test("valid update", async () => {
  const article = { ...basicNewArticle };
  article.title = "title changed";
  article.tags = basicNewArticle.tags.concat(["add", "some", "tags"]);

  const response = await request
    .post("/api/edit-article")
    .send({ token: process.env.TOKEN, ...article });
  expect(response.status).toBe(200);
  expect(response.body.error).toBe("");
  expect(response.body.valid).toBe(true);
});

afterAll(async () => {
  await User.deleteOne({ _id: basicNewArticle.userId }).exec();
  await User.deleteOne({ _id: invalidUserId }).exec();
  await Article.deleteOne({ _id: basicNewArticle.articleId }).exec();
});
