const errMsg = require('../errors/errorHandler');

async function articleValidation(User, articlUpdateProposal) {

    if (!Object.prototype.hasOwnProperty.call(articlUpdateProposal, "articleId") ||
        !Object.prototype.hasOwnProperty.call(articlUpdateProposal, "userId")) {
        return errMsg(15);
    }

    if (!Object.prototype.hasOwnProperty.call(articlUpdateProposal, "title") &&
        !Object.prototype.hasOwnProperty.call(articlUpdateProposal, "text") &&
        !Object.prototype.hasOwnProperty.call(articlUpdateProposal, "tags")) {
        return errMsg(16);
    }

    if (!/^[0-9a-fA-F]{24}$/.test(articlUpdateProposal.articleId)) {
        return errMsg(17);
    }

    if (!/^[0-9a-fA-F]{24}$/.test(articlUpdateProposal.userId)) {
        return errMsg(18);
    }

    if ("title" in articlUpdateProposal && !/^[\w, ]{3,50}$/.test(articlUpdateProposal.title)) {
        return errMsg(19);
    }

    if ("text" in articlUpdateProposal && !/^[\w,.\r\n ]{3,4000}$/.test(articlUpdateProposal.text)) {
        return errMsg(20);
    }

    if ("tags" in articlUpdateProposal && (!Array.isArray(articlUpdateProposal.tags) || articlUpdateProposal.tags.some(t => !/^[a-z]{3,50}$/.test(t)))) {
        return errMsg(21);
    }

    const ownerUser = await User.findById(articlUpdateProposal.userId).exec();

    if (!ownerUser) {
        return errMsg(22);
    }

    const oldArticle = await articlUpdateProposal.findById(articlUpdateProposal.articleId).exec();

    if (!oldArticle) {
        return errMsg(23);
    }

    if (oldArticle.userId !== articlUpdateProposal.userId) {
        return errMsg(24);
    }

    return { error: '', valid: true }


}

module.exports = articleValidation;