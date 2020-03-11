const Article = require('../model/article');
const User = require('../model/user');
const authentication = require('./auth');
const validation = require('../validators/article');
const errMsg = require('../errors/errorHandler');


function newArticle(req, res) {

    if (!req.headers['content-type'].includes("application/json")) {
        res.send(errMsg(1));
        return;
    }

    const auth = authentication(req.body);

    if (!auth.valid) {
        res.status(500).send(auth);
        return;
    }

    validation(User, req.body).then(async (validation) => {
        if (validation.valid) {
            await Article.findOneAndUpdate({ "_id": req.body.articleId }, req.body).exec();
            res.send({ created: 'Updated', error: '', valid: true });
        }
        else {
            res.send(validation);
            return;
        }
    })
}

module.exports = newArticle;