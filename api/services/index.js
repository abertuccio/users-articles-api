const express = require('express');
const router = express.Router();
router.use(express.json());

const auth = require('./authentication');
const newUser = require('./newUser');
const newArticle = require('./newArticle');
const editArticle = require('./editArticle');
const deleteArticle = require('./deleteArticle');

const services = { auth, newUser, newArticle, editArticle, deleteArticle };

router.use(services.auth);
router.post('/new-user', services.newUser);
router.post('/new-article', services.newArticle);
router.post('/edit-article', services.editArticle);
router.delete('/delete-article/:articleId', services.deleteArticle);

// router.get('/articles', function (req, res) {
//     res.send('List all articles');
// });

module.exports = router;