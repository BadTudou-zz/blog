'use static';

var express = require('express');
var session = require('express-session');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res, next) {
	if(req.session.loginstate == 'true'){
		next();
	}
	else{
		res.sendFile(path.dirname(__dirname)+'/public/html/login.html');
	}
});

router.get('/', function(req, res, next) {
	var params = req.query;
	var count = Object.keys(params).length;
	if(Object.keys(params).length === 0)
		return res.sendFile(path.dirname(__dirname)+'/public/html/manage.html');
	else
		next();
});


router.get('/', function(req, res) {
	var params = req.query;
	if(typeof(params.action) === 'undefined')
	{
		return res.end(JSON.stringify({err:true, result:'illegal request action'}));
	}

	switch(params.action) {
		
		default:
			res.end(JSON.stringify({err:true, result:'undefined request action'}));
	}
});
module.exports = router;
