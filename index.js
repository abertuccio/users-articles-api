var express = require('express');
var app = express();
app.use(express.json());
const dotenv = require('dotenv');
dotenv.config();
var services = require('./services/services');
const errMsg = require('./errors/errorHandler');
const riskStatusCode = (process.env.ENV !== 'dev') ? 500 : 200;

app.use(function (err, req, res, next) {
    if (err) {
        res.status(riskStatusCode).send(errMsg(0));
        return;
    }
    next();
});

app.use('/', function (req, res, next) {
    if (!req.headers['content-type'].includes("application/json")) {
        res.send(errMsg(1));
        return;
    }
    const auth = services.auth(req.body);

    if (!auth.valid) {
        res.status(riskStatusCode).send(auth);
        return;
    }

    next();
});

app.post('/new-user', function (req, res) {

    services.createUser(req.body)
        .then((insertRersaponse) => {
            const created = { name: insertRersaponse.name, avatar: insertRersaponse.avatar };
            res.send({ created: created, error: '', valid: true });
        }).catch((err) => {
            res.send(err);
        });

});

app.post('/new-article', function (req, res) {

    services.createArticle(req.body)
        .then(() => {
            res.send({ created: "Ok", error: '', valid: true });
        }).catch((err) => {
            res.send(err);
        });

});

app.post('/delete-article', function (req, res) {
    res.send('Delete Article');
});

app.get('/articles', function (req, res) {
    res.send('List all articles');
});

app.listen(process.env.PORT);