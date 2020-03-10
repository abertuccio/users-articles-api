function errorMessaje(code) {

    let defaultError = { error: 'Invalid request', valid: false };

    switch (code) {
        case 0:
            defaultError.error = `(${code}) Wrong request format, you are probably sending a broken JSON.`;
            break;
        case 1:
            defaultError.error = `(${code}) You must send a json, and the request header must be using the content-type application/json`;
            break;
        case 2:
        case 9:
            defaultError.error = `(${code}) Invalid request. You are not sending the minimun required parameter name. Please review the documentation.`;
            break;
        case 3:
            defaultError.error = `(${code}) Invalid name value. Please review the documentation.`;
            break;
        case 4:
            defaultError.error = `(${code}) Invalid avatar value. Please review the documentation.`;
            break;
        case 5:
            defaultError.error = `(${code}) There is no token sent. Please review the documentation.`;
            break;
        case 6:
            defaultError.error = `(${code}) Invalid Token format.`;
            break;
        case 7:
            defaultError.error = `(${code}) Invalid Token.`;
            break;
        case 8:
            defaultError.error = `(${code}) Invalid endpoint. Please review the documentation.`;
            break;
        case 10:
            defaultError.error = `(${code}) Invalid userId. Please review the documentation.`;
            break;
        case 11:
            defaultError.error = `(${code}) Invalid title. Please review the documentation.`;
            break;
        case 12:
            defaultError.error = `(${code}) Invalid text. Please review the documentation.`;
            break;
        case 13:
            defaultError.error = `(${code}) Invalid tags. Please review the documentation.`;
            break;
        case 14:
            defaultError.error = `(${code}) Invalid user. Please provide a valid user.`;
            break;
        default:
            break;
    }

    return defaultError;

}

module.exports = errorMessaje;