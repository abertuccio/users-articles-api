const  express = require('express');
const router = express.Router();
const createUser = require('./createUser');
const createArticle = require('./createArticle');
const auth = require('./auth');
router.use(express.json());

const services = {createUser,createArticle,auth};

router.post('/new-user', services.createUser);

router.post('/new-article', services.createArticle);

router.delete('/delete-article', function (req, res) {
    res.send('Delete Article');
});

router.get('/articles', function (req, res) {
    res.send('List all articles');
});
 
module.exports = router;