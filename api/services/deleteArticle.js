const Article = require('../model/article');
const validation = require('../validators/deleteArticle');


function deleteArticle(req, res) {

    const articleId = (req.params.articleId || null);

 
    validation(Article, articleId).then(async (validation) => {
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