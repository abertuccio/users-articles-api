var User = require('../schemes/user').User;
var validation = require('../validators/user');


async function createUser(newUser) {

    const validationResult = await validation(User, newUser);

    console.log(validationResult);

    if (validationResult.valid) {

        var user = new User(newUser);

        return user.save();
    }
    else {
        throw validationResult;
    }


}

module.exports = createUser;