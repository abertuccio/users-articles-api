const errMsg = require('../errors/errorHandler');


async function userValidation(model, user) {

    const defaultAvatarURL = "https://api.adorable.io/avatars/285/abott@adorable.png";

    if (!Object.prototype.hasOwnProperty.call(user, "name")) {
        return errMsg(2);
    }

    user.name = user.name.trim();
    user.avatar = (Object.prototype.hasOwnProperty.call(user, "avatar") &&
        user.avatar.trim().length) ? user.avatar : defaultAvatarURL;

    if (!/^[a-z ]{3,50}$/gi.test(user.name)) {
        return errMsg(3);
    }

    if (!/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/gi
        .test(user.avatar)) {
        return errMsg(4);
    }

    var prevUser = await model.findOne({ name: user.name }).exec();

    return (prevUser) ? errMsg(5) : { error: '', valid: true };

}

module.exports = userValidation;