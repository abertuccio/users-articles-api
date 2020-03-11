const User = require('../model/user');
const Article = require('../model/article');
const validation = require('../validators/editArticle');


function editArticle(req, res) {

    validation(User, Article, req.body).then(async (validation) => {
        if (validation.valid) {
            await Article.findOneAndUpdate({ "_id": req.body.articleId }, req.body).exec();
            res.send(
                {
                    created: 'Updated',
                    error: '',
                    valid: true
                });
        }
        else {
            res.send(validation);
            return;
        }
    })
}

module.exports = editArticle;