const validator = require("../validators/authentication");
const errMsg = require("../errors/errorHandler");

function authentication(req, res, next) {
  if (!("content-type" in req.headers)) return next();

  if (!req.headers["content-type"].includes("application/json")) {
    return res.send(errMsg(1));
  }

  const validation = validator(req.body);

  if (!validation.valid) return res.status(500).send(validation);

  if (req.body.token === process.env.TOKEN) {
    return next();
  } else {
    return res.status(500).send(errMsg(7));
  }
}

module.exports = authentication;
