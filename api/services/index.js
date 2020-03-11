const  express = require('express');
const router = express.Router();
router.use(express.json());

const newUser = require('./newUser');
const newArticle = require('./newArticle');
const editArticle = require('./editArticle');

const services = {newUser,newArticle, editArticle};

router.post('/new-user', services.newUser);
router.post('/new-article', services.newArticle);
router.post('/edit-article', services.editArticle);

// router.delete('/delete-article', function (req, res) {
//     res.send('Delete Article');
// });

// router.get('/articles', function (req, res) {
//     res.send('List all articles');
// });
 
module.exports = router;