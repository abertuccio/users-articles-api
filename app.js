const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const services = require('./services/services.js');
const errMsg = require('./errors/errorHandler');

app.use('/api', services);

app.use(function (err, req, res, next) {
    if (err) {
        res.status(500).send(errMsg(0));
        return;
    }
    next();
});


app.listen(process.env.PORT, ()=>{ console.log("Server running") });