const mongoose = require("../db/conection").mongoose;

const ArticleSchema = new mongoose.Schema({
  userId: String,
  title: String,
  text: String,
  tags: [String]
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
