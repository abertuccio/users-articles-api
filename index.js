var express = require('express');
var app = express();
app.use(express.json());

var services = require('./services/services');

app.post('/new-user', function (req, res) {

    if(!req.headers['content-type'].includes("application/json")){
        res.send({errors:["You should send the request using the content-type application/json :("], valid:false});
        return;
    }

    services.createUser(req.body)
        .then((insertRersaponse) => {
            res.send({ created: insertRersaponse, errors: [], valid: true });
        }).catch((err) => {
            res.send(err);
        });

});

app.post('/new-article', function (req, res) {
    
    if(!req.headers['content-type'].includes("application/json")){
        res.send({errors:["You should send the request using the content-type application/json :("], valid:false});
        return;
    }

    services.createArticle(req.body)
        .then((insertRersaponse) => {
            res.send({ created: insertRersaponse, errors: [], valid: true });
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

app.listen(3000, function () {
    console.log('API on port 3000 running');
});