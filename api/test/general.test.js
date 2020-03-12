const mongoose = require("mongoose");
const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);
afterAll(() => mongoose.disconnect());

test("Wrong GET endpoint", async () => {
  const response = await request.get("/");
  expect(response.status).toBe(404);
  expect(typeof response.body).toBe("object");
  expect(response.body.error).toMatch(/Invalid endpoint/);
});

test("Wrong POST endpoint", async () => {
  const response = await request.post("/");
  expect(response.status).toBe(404);
  expect(typeof response.body).toBe("object");
  expect(response.body.error).toMatch(/Invalid endpoint/);
});

test("Wrong route endpoint", async () => {
  const response = await request.get("/whatever");
  expect(response.status).toBe(404);
  expect(typeof response.body).toBe("object");
  expect(response.body.error).toMatch(/Invalid endpoint/);
});

test("Wrong route endpoint /api/", async () => {
  const response = await request.get("/api/whatever");
  expect(response.status).toBe(404);
  expect(typeof response.body).toBe("object");
  expect(response.body.error).toMatch(/Invalid endpoint/);
});

test("Wrong route endpoint /api/wrong", async () => {
  const response = await request.get("/api/");
  expect(response.status).toBe(404);
  expect(typeof response.body).toBe("object");
  expect(response.body.error).toMatch(/Invalid endpoint/);
});

test("Wrong request content-type", async () => {
  const response = await request.post("/api/new-user").send("some string");
  expect(response.status).toBe(200);
  expect(typeof response.body).toBe("object");
  expect(response.body.error).toMatch(/content-type/);
});

test("Empty json", async () => {
  const response = await request.post("/api/new-user").send({});
  expect(response.status).toBe(500);
  expect(typeof response.body).toBe("object");
  expect(response.body.error).toMatch(/no token sent/);
});

test("Correct request but no token", async () => {
  const response = await request.post("/api/new-user").send({ name: "john" });
  expect(response.status).toBe(500);
  expect(typeof response.body).toBe("object");
  expect(response.body.error).toMatch(/no token sent/);
});

test("Correct request but wrong token format", async () => {
  const response = await request
    .post("/api/new-user")
    .send({ token: "a-$", name: "john" });
  expect(response.status).toBe(500);
  expect(typeof response.body).toBe("object");
  expect(response.body.error).toMatch(/Invalid Token format/);
});

test("Correct request but empty token", async () => {
  const response = await request
    .post("/api/new-user")
    .send({ token: "", name: "john" });
  expect(response.status).toBe(500);
  expect(typeof response.body).toBe("object");
  expect(response.body.error).toMatch(/Invalid Token format/);
});

test("Correct request but invalid token", async () => {
  const response = await request
    .post("/api/new-user")
    .send({ token: "1CD4ED171E1C95FE163B753A297D5", name: "john" });
  expect(response.status).toBe(500);
  expect(typeof response.body).toBe("object");
  expect(response.body.error).toMatch(/Invalid Token/);
});
