var mongoose = require('../db/conection').mongoose;

var ArticleSchema = new mongoose.Schema({
    name: String
});

var Article = mongoose.model('Article', ArticleSchema);  

module.exports.Article = Article;