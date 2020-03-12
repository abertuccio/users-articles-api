const Article = require('../model/article');
const validation = require('../validators/allArticles');


function newArticle(req, res) {

    console.log(req.query);

    return res.send("articulos");

    // validation(User, req.body).then(async (validation) => {
    //     if (validation.valid) {
    //         const article = await new Article(req.body).save();
    //         return res.send({
    //             created: {
    //                 articleId: article.id
    //             },
    //             error: '',
    //             valid: true
    //         });
    //     }
    //     else {
    //         return res.send(validation);
    //     }
    // })
}

module.exports = newArticle;