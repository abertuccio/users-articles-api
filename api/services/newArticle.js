const Article = require('../model/article');
const User = require('../model/user');
const validation = require('../validators/newArticle');


function newArticle(req, res) {

    validation(User, req.body).then(async (validation) => {
        if (validation.valid) {
            const article = await new Article(req.body).save();
            return res.send({
                created: {
                    articleId: article.id
                },
                error: '',
                valid: true
            });
        }
        else {
            return res.send(validation);
        }
    })
}

module.exports = newArticle;