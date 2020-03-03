var validation = require('../validators/auth');
const errMsg = require('../errors/errorHandler');

function auth(params) {

    const validationResult = validation(params);

    if (validationResult.valid) {

        if (params.token === process.env.TOKEN) {
            return { error: '', valid: true };
        }
        else {
            return errMsg(7);
        }
    }

    return validationResult;


}

module.exports = auth;