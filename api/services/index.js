const  express = require('express');
const router = express.Router();
router.use(express.json());

const newUser = require('./newUser');
const newArticle = require('./newArticle');

const services = {newUser,newArticle};

router.post('/new-user', services.newUser);

router.post('/new-article', services.newArticle);

router.delete('/delete-article', function (req, res) {
    res.send('Delete Article');
});

router.get('/articles', function (req, res) {
    res.send('List all articles');
});
 
module.exports = router;