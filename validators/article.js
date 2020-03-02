async function articleValidation(model, article) {

    let validation = { errors: [], valid: false };

    if (!article.hasOwnProperty("userId") ||
        !article.hasOwnProperty("title") ||
        !!article.hasOwnProperty("text") ||
        !article.hasOwnProperty("tags")) {

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