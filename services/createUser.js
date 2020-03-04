const User = require('../model/user').User;
const validation = require('../validators/user');


function createUser(req, res) {

    validation(User, req.body).then(async (validation) => {
        if (validation.valid) {
            const inserted = await new User(req.body).save();
            const created = { name: inserted.name, avatar: inserted.avatar };
            res.send({ created: created, error: '', valid: true });
        }
        else {
            res.status(500).send(validation);
            return;
        }
    })
}

module.exports = createUser;