const Article = require('../model/article');
const User = require('../model/user');
const authentication = require('./auth');
const validation = require('../validators/deleteArticle');
const errMsg = require('../errors/errorHandler');


function deleteArticle(req, res) {

     validation(User, req.body).then(async (validation) => {
        if (validation.valid) {
            const article = await Article.deleteOne({ _id: req.body.articleId }).exec();
            res.send({ deleted: {articleId:article.id}, error: '', valid: true });
        }
        else {
            res.send(validation);
            return;
        }
    })
}

module.exports = deleteArticle;