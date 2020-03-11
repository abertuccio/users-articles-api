require('dotenv').config();
const mongoose = require('mongoose');
const databaseURL = (process.env.DATABASE_URL || 'localhost/');
const database = (process.env.DATABASE || 'usersArticlesApi');

mongoose.connect(`mongodb://${databaseURL}${database}`, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false  });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("DB running");
});

module.exports.mongoose = mongoose;