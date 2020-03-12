// const Article = require('../model/article');
const validator = require("../validators/allArticles");

function newArticle(req, res) {
  const validation = validator(req.query);

  return res.send(validation);
  // if (!validation.valid) return res.send(validation);

  // await Article.findOneAndUpdate({ "_id": req.body.articleId }, req.body).exec();
  // res.send(
  //     {
  //         created: 'Updated',
  //         error: '',
  //         valid: true
  //     });
}

module.exports = newArticle;
