'use static';

var express = require('express');
var session = require('express-session');
var router = express.Router();
var user = require('../servers/user');
var path = require('path');

router.get('/', function(req, res, next) {
	var params = req.query;
	switch(params.action) {
		case 'user-login':
			var fields = 'name';
			var condition = {
				name: params.name,
				password: params.password
			};
			var range = {from:0, count:1};
			user.search(fields, condition, range, (err, result)=> {
				if(!err && result.length){
					console.log('登陆成功 ');
					req.session.loginstate = 'true';
					res.end(JSON.stringify({err:false, result:result}));
				}
				else{
					console.log('登陆失败 ');
					res.end(JSON.stringify({err:true, result:'user not exists or password war wrong'}));
				}

			});
			break;

		default:
			res.end(JSON.stringify({err:true, result:'undefined request action'}));
	}
	
});
module.exports = router;
