var mongoose = require('../db/conection').mongoose;

var UserSchema = new mongoose.Schema(
    {
        name: String,
        avatar: String
    }
);

var User = mongoose.model('User', UserSchema);

module.exports.User = User;