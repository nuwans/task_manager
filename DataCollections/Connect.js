var mongoose = require("mongoose");
var config = require('./Config.js');

var exmongoose = mongoose.createConnection(config.connectionstring, config.options);

mongoose.set('debug', true);

mongoose.connection.on('error', function (err) {
    console.log(err);
    
});

mongoose.connection.on('connected', function () {
    console.log("connected to db " + config.connectionstring);
});


module.exports = exmongoose;