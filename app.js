const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const services = require('./services/services.js');
const errMsg = require('./errors/errorHandler');

app.use('/api', services);

app.use(function(req,res){ 
    res.status(404).send(errMsg(8));
});

app.use(function (err, req, res, next) {
    // console.log(err);
    if (err) {
        res.status(500).send(errMsg(0));
        return;
    }
    next();
});

module.exports = app;