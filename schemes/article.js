var mongoose = require('../db/conection').mongoose;

var ArticleSchema = new mongoose.Schema({
    title: String,
    text: String,
    tags: [String]
});

var Article = mongoose.model('Article', ArticleSchema);

module.exports.Article = Article;