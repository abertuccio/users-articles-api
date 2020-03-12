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

beforeAll(async () => {
  const userRes = await request
    .post("/api/new-user")
    .send({ token: process.env.TOKEN, name: "Name i" });
  basicNewArticle.userId = userRes.body.created.userId;

  const ArticleRes = await request
    .post("/api/new-article")
    .send({ token: process.env.TOKEN, name: "Name j", ...basicNewArticle });
  basicNewArticle.articleId = ArticleRes.body.created.articleId;
});

test("Invalid request verb", async () => {
  const response = await request
    .post("/api/delete-article")
    .send({ token: process.env.TOKEN });
  expect(response.status).toBe(404);
  expect(typeof response.body).toBe("object");
  expect(response.body.error).toMatch(/Invalid endpoint/);
});

test("Invalid parameters", async () => {
  const response = await request
    .delete("/api/delete-article")
    .send({ token: process.env.TOKEN });
  expect(response.status).toBe(404);
  expect(typeof response.body).toBe("object");
  expect(response.body.error).toMatch(/Invalid endpoint/);
});

test("article does not exist", async () => {
  let articleId = "555555555555555555555555";
  const response = await request
    .delete("/api/delete-article/" + articleId)
    .send({ token: process.env.TOKEN });
  expect(response.status).toBe(200);
  expect(response.body.error).toMatch(/not exist/);
});

test("valid delete", async () => {
  const response = await request
    .delete("/api/delete-article/" + basicNewArticle.articleId)
    .send({ token: process.env.TOKEN });
  expect(response.status).toBe(200);
  expect(response.body.error).toBe("");
  expect(response.body.valid).toBe(true);
});

afterAll(async () => {
  await User.deleteOne({ _id: basicNewArticle.userId }).exec();
  await Article.deleteOne({ _id: basicNewArticle.articleId }).exec();
});
