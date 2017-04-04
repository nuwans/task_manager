var http =require("http"),
    app=require('../app');

var port =3000;
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port); 
console.log("server listning");
module.exports=server;