const User = require("../model/user");
const validator = require("../validators/user");

async function newUser(req, res) {
  const validation = await validator(User, req.body);

  if (!validation.valid) return res.send(validation);

  const inserted = await new User(req.body).save();

  const created = {
    userId: inserted._id,
    name: inserted.name,
    avatar: inserted.avatar
  };

  return res.send({
    created: created,
    error: "",
    valid: true
  });
}

module.exports = newUser;
