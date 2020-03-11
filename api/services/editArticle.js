const User = require('../model/user');
const Article = require('../model/article');
const authentication = require('./auth');
const validation = require('../validators/editArticle');
const errMsg = require('../errors/errorHandler');


function editArticle(req, res) {

    if (!req.headers['content-type'].includes("application/json")) {
        res.send(errMsg(1));
        return;
    }

    const auth = authentication(req.body);

    if (!auth.valid) {
        res.status(500).send(auth);
        return;
    }

    validation(User, Article, req.body).then(async (validation) => {
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

module.exports = editArticle;