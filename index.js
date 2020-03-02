var express = require('express');
var app = express();

var schemes = require('./schemes/schemes');

console.log(schemes);

app.post('/new-user', function (req, res) {
    res.send('New User');
});

app.post('/new-article', function (req, res) {
    res.send('New Article');
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