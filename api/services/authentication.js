const validation = require('../validators/authentication');
const errMsg = require('../errors/errorHandler');

function authentication(req, res, next) {

    if(!('content-type' in req.headers)){
        return next();
    }

    if (!req.headers['content-type'].includes("application/json")) {
        return res.send(errMsg(1));
    }

    const validationResult = validation(req.body);
    
    if (validationResult.valid) {

        if (req.body.token === process.env.TOKEN) {
            return next();
        }
        else {
            return res.status(500).send(errMsg(7));
        }
    }

    return res.status(500).send(validationResult);

}

module.exports = authentication;