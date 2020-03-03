var express = require('express');
var app = express();
app.use(express.json());

var services = require('./services/services');

app.use(function(err, req, res, next){
    if(err){
        res.status(500).send({ error: 'Invalid request', valid: false });
        return;
    }
    next();
});

app.use('/', function (req, res, next) {
    
    if (!req.headers['content-type'].includes("application/json")) {
        res.send({ error: 'You should send the request using the content-type application/json :(', valid: false });
        return;
    }
    next();
    
});

app.post('/new-user', function (req, res) {

    services.createUser(req.body)
        .then((insertRersaponse) => {
            res.send({ created: insertRersaponse, error: '', valid: true });
        }).catch((err) => {
            res.send(err);
        });

});

app.post('/new-article', function (req, res) {

    services.createArticle(req.body)
        .then((insertRersaponse) => {
            res.send({ created: insertRersaponse, error: '', valid: true });
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

app.listen(3000);