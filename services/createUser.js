const User = require('../schemes/user').User;
const validation = require('../validators/user');


async function createUser(newUser) {

    const validationResult = await validation(User, newUser);

    if (validationResult.valid) {

        return new User(newUser).save();
    }
    else {

        throw validationResult;

    }


}

module.exports = createUser;