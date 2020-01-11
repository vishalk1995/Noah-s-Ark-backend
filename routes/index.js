var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(
	  "<body><h1>PSQL service for Noah's Ark</h1><br><a href='#'> API Docs</a></body>"
  );
});

module.exports = router;
