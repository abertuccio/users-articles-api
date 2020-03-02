async function userValidation(model, user) {

    let validation = { errors: [], valid: true };
    const defaultAvatarURL = "https://api.adorable.io/avatars/285/abott@adorable.png";

    user.name = user.name.trim();
    user.avatar = (user.hasOwnProperty("avatar") && user.avatar.trim().length) ? user.avatar : defaultAvatarURL;

    if (!/^[a-z ]{3,15}$/gi.test(user.name)) {
        validation.errors.push('"Name" it is not correct, you shoud use from 3 to 15 english letters and spaces');
        validation.valid = false;
    }
    else {

        if (!/^((https?:)(\/\/\/?)([\w]*(?::[\w]*)?@)?([\d\w\.-]+)(?::(\d+))?)?([\/\\\w\.()-]*)?(?:([?][^#]*)?(#.*)?)*/gi.test(user.avatar)) {
            user.avatar = defaultAvatarURL;
            validation.errors.push('"Avatar" it is not a valid URL');
        }

        if (validation.valid) {
            var prevUser = await model.find({ name: user.name }).exec();

            if (prevUser.length) {
                validation.errors.push("This name already exist! Please choose another.");
                validation.valid = false;
            }
        }

    }

    return validation;

}

module.exports = userValidation;