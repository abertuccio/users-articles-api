const User = require('../model/user');
const validation = require('../validators/user');


function newUser(req, res) {

    validation(User, req.body).then(async (validation) => {
        if (validation.valid) {
            const inserted = await new User(req.body).save();
            const created = {
                userId: inserted._id,
                name: inserted.name,
                avatar: inserted.avatar
            };
            return res.send({
                created: created,
                error: '',
                valid: true
            });
        }
        else {
            return res.send(validation);
        }
    })

}

module.exports = newUser;