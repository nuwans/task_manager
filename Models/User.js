var mongoose = require('mongoose');
var Schema=mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId; 
var db = require("../DataCollections/Connect.js");

var UserSchema = new mongoose.Schema({
        
        Username: {type:String,required:true},
        Password:{type:String,required:true}

},{ strict: true });

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return password==this.Password;
};

var UserModel = db.model('User', UserSchema);

module.exports = UserModel;