var mongoose = require('../db/conection').mongoose;

var UserSchema = new mongoose.Schema(
    {
        name: String,
        avatar: String
    }
);

// UserSchema.pre("save", function (next) {

//     console.log("-------------------");
//     console.log(validation(UserSchema,this));
//     console.log("-------------------");

//     if (!this.hasOwnProperty('name')) {
//         next("There is no name property");
//     }
//     else {
//         next();
//     }

// });

var User = mongoose.model('User', UserSchema);



module.exports.User = User;