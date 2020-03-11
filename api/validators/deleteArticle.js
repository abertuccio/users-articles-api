const errMsg = require('../errors/errorHandler');

async function articleValidation(User, Article, articleUpdateProposal) {

    if (!Object.prototype.hasOwnProperty.call(articleUpdateProposal, "articleId") ||
        !Object.prototype.hasOwnProperty.call(articleUpdateProposal, "userId")) {
        return errMsg(25);
    }

    if (!/^[0-9a-fA-F]{24}$/.test(articleUpdateProposal.articleId)) {
        return errMsg(26);
    }

    if (!/^[0-9a-fA-F]{24}$/.test(articleUpdateProposal.userId)) {
        return errMsg(27);
    }

    const ownerUser = await User.findById(articleUpdateProposal.userId).exec();

    if (!ownerUser) {
        return errMsg(28);
    }

    const oldArticle = await Article.findById(articleUpdateProposal.articleId).exec();

    if (!oldArticle) {
        return errMsg(29);
    }

    if (oldArticle.userId !== articleUpdateProposal.userId) {
        return errMsg(30);
    }

    return { error: '', valid: true }


}

module.exports = articleValidation;