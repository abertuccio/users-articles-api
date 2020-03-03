const errMsg = require('../errors/errorHandler');


function authValidation(params) {


    if (!Object.prototype.hasOwnProperty.call(params, "token")) {
        return errMsg(5);
    }

    if (!/^[A-Z0-9]{20,30}$/.test(params.token)) {
        return errMsg(6);
    }

    return { error: '', valid: true };

}

module.exports = authValidation;