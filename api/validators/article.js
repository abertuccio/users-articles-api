async function articleValidation(model, article) {

    let validation = { error: [], valid: false };

    if (!Object.prototype.hasOwnProperty.call(article, "userId") ||
        !Object.prototype.hasOwnProperty.call(article, "title") ||
        !Object.prototype.hasOwnProperty.call(article, "text") ||
        !Object.prototype.hasOwnProperty.call(article, "tags")) {

        validation.error = 'Invalid request. Plaese review the documentation';

        validation.valid = false;
        return validation;

    }

    return validation;


}

module.exports = articleValidation;