var express = require('express');
var router = express.Router();
var sleep = require('system-sleep');

/* GET users listing. */
router.get('/', function(req, res, next) {
		sleep(50000);
  res.send('respond with a resource');
});

module.exports = router;
