const mongoose = require('../db/conection').mongoose;

const UserSchema = new mongoose.Schema(
    {
        name: String,
        avatar: String
    }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;