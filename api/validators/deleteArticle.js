const errMsg = require('../errors/errorHandler');

async function articleValidation(Article, articleId) {

    if(!articleId){
        return errMsg(27);
    }

    if (!/^[0-9a-fA-F]{24}$/.test(articleId)) {
        return errMsg(25);
    }

    const oldArticle = await Article.findById(articleId).exec();

    if (!oldArticle) {
        return errMsg(26);
    }

    return { error: '', valid: true }


}

module.exports = articleValidation;