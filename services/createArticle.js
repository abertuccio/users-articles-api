var Article = require('../model/article').User;
var validation = require('../validators/article');


async function createArticle(newArticle) {

    const validationResult = await validation(Article, newArticle);

    if (validationResult.valid) {

        var article = new Article(newArticle);

        return article.save();
    }
    else {
        throw validationResult;
    }


}

module.exports = createArticle;