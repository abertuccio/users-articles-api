const Article = require("../model/article");
const validator = require("../validators/deleteArticle");

async function deleteArticle(req, res) {
  const articleId = req.params.articleId || null;
  const validation = await validator(Article, articleId);

  if (!validation.valid) return res.send(validation);

  const article = await Article.deleteOne({
    _id: req.params.articleId
  }).exec();

  const response = {
    deleted: { ...article.id },
    error: "",
    valid: true
  };

  res.send(response);
}

module.exports = deleteArticle;
