const express = require('express');
const router = express.Router();
router.use(express.json());

const authentication = require('./authentication');
const newUser = require('./newUser');
const newArticle = require('./newArticle');
const editArticle = require('./editArticle');
const deleteArticle = require('./deleteArticle');
const allArticles = require('./allArticles');

router.use(authentication);
router.post('/new-user', newUser);
router.post('/new-article', newArticle);
router.post('/edit-article', editArticle);
router.delete('/delete-article/:articleId', deleteArticle);
router.get('/all-articles', allArticles);

module.exports = router;