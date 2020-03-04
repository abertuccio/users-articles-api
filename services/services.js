const  express = require('express');
const router = express.Router();
const createUser = require('./createUser');
const createArticle = require('./createArticle');
const auth = require('./auth');
const errMsg = require('../errors/errorHandler');
router.use(express.json());

const services = {createUser,createArticle,auth};

router.use('/', function (req, res, next) {
    if (!req.headers['content-type'].includes("application/json")) {
        res.send(errMsg(1));
        return;
    }

    const auth = services.auth(req.body);

    if (!auth.valid) {
        res.status(500).send(auth);
        return;
    }

    next();
});

router.post('/new-user', services.createUser);

router.post('/new-article', services.createArticle);

router.delete('/delete-article', function (req, res) {
    res.send('Delete Article');
});

router.get('/articles', function (req, res) {
    res.send('List all articles');
});
 
module.exports = router;