function errorMessaje(code) {

    let defaultError = { error: 'Invalid request', valid: false };

    if (process.env.ENV !== 'dev') {
        return defaultError;
    }

    switch (code) {
        case 0:
            defaultError.error = `(${code}) Wrong request format, you are probably sending a broken JSON.`;
            break;
        case 1:
            defaultError.error = `(${code}) You should send the request using the content-type application/json header`;
            break;
        case 2:
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
        default:
            break;
    }

    return defaultError;

}

module.exports = errorMessaje;