const errMsg = require("../errors/errorHandler");

async function articleValidation(User, article) {
  if (
    !Object.prototype.hasOwnProperty.call(article, "userId") ||
    !Object.prototype.hasOwnProperty.call(article, "title") ||
    !Object.prototype.hasOwnProperty.call(article, "text") ||
    !Object.prototype.hasOwnProperty.call(article, "tags")
  ) {
    return errMsg(9);
  }

  if (!/^[0-9a-fA-F]{24}$/.test(article.userId)) {
    return errMsg(10);
  }

  if (!/^[\w, ]{3,50}$/.test(article.title)) {
    return errMsg(11);
  }

  if (!/^[\w,.\r\n ]{3,4000}$/.test(article.text)) {
    return errMsg(12);
  }

  if (
    !Array.isArray(article.tags) ||
    article.tags.some(t => !/^[a-z]{3,50}$/.test(t))
  ) {
    return errMsg(13);
  }

  const user = await User.findById(article.userId).exec();

  if (!user) return errMsg(14);

  return { error: "", valid: true };
}

module.exports = articleValidation;
