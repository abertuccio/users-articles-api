const Article = require('../model/article');
const User = require('../model/user');
const validator = require('../validators/newArticle');


async function newArticle(req, res) {

    const validation = await validator(User, req.body);

    if (!validation.valid) return res.send(validation);

    const article = await new Article(req.body).save();
    return res.send({
        created: {
            articleId: article.id
        },
        error: '',
        valid: true
    });

}

module.exports = newArticle;