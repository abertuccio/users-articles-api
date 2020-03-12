const Article = require('../model/article');
const validation = require('../validators/allArticles');


function newArticle(req, res) {

    console.log(req.query);

    return res.send("articulos");

    // const validation = await validator(User, Article, req.body);

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