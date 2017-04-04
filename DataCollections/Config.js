function config() {
    this.connectionstring = "";
    this.options = {};

}
var newconfig = new config;
newconfig.connectionstring = "mongodb://localhost:27017/indiez";
newconfig.options = { replset: { socketOptions: { connectTimeoutMS: 15000 } } };

module.exports = newconfig;
