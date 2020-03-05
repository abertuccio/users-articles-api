const User = require('../model/user').User;
const authentication = require('./auth');
const validation = require('../validators/user');
const errMsg = require('../errors/errorHandler');


function newUser(req, res) {

    if (!req.headers['content-type'].includes("application/json")) {
        res.send(errMsg(1));
        return;
    }

    const auth = authentication(req.body);

    if (!auth.valid) {
        res.status(500).send(auth);
        return;
    }

    validation(User, req.body).then(async (validation) => {
        if (validation.valid) {
            const inserted = await new User(req.body).save();
            const created = { name: inserted.name, avatar: inserted.avatar };
            res.send({ created: created, error: '', valid: true });
        }
        else {
            res.send(validation);
            return;
        }
    })
}

module.exports = newUser;