var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Login');
});
router.get('/logout', function(req, res, next) {
  req.logout();
  req.session.destroy();
  res.send({message:"Successfully logged out"});
});

module.exports = router;
