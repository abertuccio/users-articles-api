async function userValidation(model, user) {

    let validation = { error: '', valid: true };
    const defaultAvatarURL = "https://api.adorable.io/avatars/285/abott@adorable.png";


    if (!Object.prototype.hasOwnProperty.call(user, "name")) {
        validation.error = 'Invalid request. Please review the documentation.';

        validation.valid = false;
        return validation;
    }


    user.name = user.name.trim();
    user.avatar = (Object.prototype.hasOwnProperty.call(user, "avatar") &&
        user.avatar.trim().length) ? user.avatar : defaultAvatarURL;

    if (!/^[a-z ]{3,50}$/gi.test(user.name)) {
        validation.error = 'Invalid name value. Please review the documentation.';
        validation.valid = false;
    }
    else {

        if (!/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/gi
            .test(user.avatar)) {
                
            user.avatar = defaultAvatarURL;
            validation.error = 'Invalid avatar value. Please review the documentation.';
            validation.valid = false;
        }

        if (validation.valid) {
            var prevUser = await model.findOne({ name: user.name }).exec();

            if (prevUser) {
                validation.error = 'This name already exist! Please choose another.';
                validation.valid = false;
            }
        }

    }

    return validation;

}

module.exports = userValidation;