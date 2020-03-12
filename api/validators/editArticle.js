const errMsg = require("../errors/errorHandler");

async function articleValidation(User, Article, articleUpdateProposal) {
  if (
    !Object.prototype.hasOwnProperty.call(articleUpdateProposal, "articleId") ||
    !Object.prototype.hasOwnProperty.call(articleUpdateProposal, "userId")
  ) {
    return errMsg(15);
  }

  if (
    !Object.prototype.hasOwnProperty.call(articleUpdateProposal, "title") &&
    !Object.prototype.hasOwnProperty.call(articleUpdateProposal, "text") &&
    !Object.prototype.hasOwnProperty.call(articleUpdateProposal, "tags")
  ) {
    return errMsg(16);
  }

  if (!/^[0-9a-fA-F]{24}$/.test(articleUpdateProposal.articleId)) {
    return errMsg(17);
  }

  if (!/^[0-9a-fA-F]{24}$/.test(articleUpdateProposal.userId)) {
    return errMsg(18);
  }

  if (
    "title" in articleUpdateProposal &&
    !/^[\w, ]{3,50}$/.test(articleUpdateProposal.title)
  ) {
    return errMsg(19);
  }

  if (
    "text" in articleUpdateProposal &&
    !/^[\w,.\r\n ]{3,4000}$/.test(articleUpdateProposal.text)
  ) {
    return errMsg(20);
  }

  if (
    "tags" in articleUpdateProposal &&
    (!Array.isArray(articleUpdateProposal.tags) ||
      articleUpdateProposal.tags.some(t => !/^[a-z]{3,50}$/.test(t)))
  ) {
    return errMsg(21);
  }

  const ownerUser = await User.findById(articleUpdateProposal.userId).exec();

  if (!ownerUser) {
    return errMsg(22);
  }

  const oldArticle = await Article.findById(
    articleUpdateProposal.articleId
  ).exec();

  if (!oldArticle) {
    return errMsg(23);
  }

  if (oldArticle.userId !== articleUpdateProposal.userId) {
    return errMsg(24);
  }

  return { error: "", valid: true };
}

module.exports = articleValidation;
