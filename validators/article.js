async function articleValidation(model, article) {

    let validation = { errors: [], valid: false };

    if (!Object.prototype.hasOwnProperty.call(article, "userId") ||
        !Object.prototype.hasOwnProperty.call(article, "title") ||
        !Object.prototype.hasOwnProperty.call(article, "text") ||
        !Object.prototype.hasOwnProperty.call(article, "tags")) {

        validation.errors.push(`You shoud send the request 
                                using the format: 
                                {
                                    userId: String,
                                    title: String, 
                                    text: String, 
                                    tags: String 
                                }`);

        validation.valid = false;
        return validation;

    }

    return validation;


}

module.exports = articleValidation;