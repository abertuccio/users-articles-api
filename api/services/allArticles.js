const Article = require("../model/article");
const validator = require("../validators/allArticles");

async function allArticles(req, res) {
  const tagsParam =
    "tags" in req.query && req.query.tags ? req.query.tags : "[]";
  const arrayTags = JSON.parse(tagsParam) || [];

  const validation = validator(arrayTags);

  if (!validation.valid) return res.send(validation);

  const query = arrayTags.length > 0 ? { tags: { $in: arrayTags } } : {};

  const articles = await Article.find(query).exec();

  res.send({
    articles: articles,
    error: "",
    valid: true
  });
}

module.exports = allArticles;
