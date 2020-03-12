const express = require("express");
const app = express();
const services = require("./services/");
const errMsg = require("./errors/errorHandler");

app.use("/api", services);

app.use(function(req, res) {
  res.status(404).send(errMsg(8));
});

app.use(function(err, req, res, next) {
  if (err) {
    res.status(500).send(errMsg(0));
    return;
  }
  next();
});

module.exports = app;
