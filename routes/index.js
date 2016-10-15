var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.session.state == 'true'){
		console.log('登陆');
	}
	else{

	}
	console.log(req.session.state+':'+req.session.id);
	res.sendFile(path.dirname(__dirname)+'/public/html/index.html');
});

module.exports = router;
