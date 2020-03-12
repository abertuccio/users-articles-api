const User = require('../model/user');
const Article = require('../model/article');
const validator = require('../validators/editArticle');


async function editArticle(req, res) {

    const validation = await validator(User, Article, req.body);

    if (!validation.valid) return res.send(validation);

    await Article.findOneAndUpdate({ "_id": req.body.articleId }, req.body).exec();
    res.send(
        {
            created: 'Updated',
            error: '',
            valid: true
        });

}

module.exports = editArticle;