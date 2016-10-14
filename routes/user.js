'use static';

var express = require('express');
var router = express.Router();
var user = require('../servers/user');
var path = require('path');

router.get('/', function(req, res, next) {
	var params = req.query;
	var count = Object.keys(params).length;
	if(Object.keys(params).length === 0)
		return res.sendFile(path.dirname(__dirname)+'/public/html/login.html');
	else
		next();
});

router.put('/', function(req, res) {
	var params = req.body;
	if(typeof(params.action) === 'undefined')
	{
		return res.end(JSON.stringify({err:true, result:'illegal request action'}));
	}
	switch(params.action) {
		case 'user-login':
			if(typeof(params.user.name) === 'undefined' || typeof(params.user.password) === 'undefined')
			{
				return res.end('参数不正确');
			}

			var fields = 'name';
			var condition = {
				name: params.user.name,
				password: params.user.password
			};
			console.log(JSON.stringify(condition));
			user.search(fields, condition, (err, result)=> {

				if(!err && result.length)
					res.end(JSON.stringify({err:false, result:result}));
				else
					res.end(JSON.stringify({err:true, result:'user not exists or password war wrong'}));

			});
			break;

		default:
			res.end(JSON.stringify({err:true, result:'undefined request action'}));
	}

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
