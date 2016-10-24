'use static';

var express = require('express');
var session = require('express-session');
var router = express.Router();
var discuss = require('../servers/discuss');
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
	// 	case 'discuss-state':
	// 		if(req.session.loginstate != 'true'){
	// 			return res.sendFile(path.dirname(__dirname)+'/public/html/login.html');
	// 		}

	// 		var newDiscuss = {
	// 			id:req.body.id,
	// 			state:req.body.state
	// 		};

	// 		discuss.edit(newDiscuss, (err, result)=>{
	// 			if(!err)
	// 				res.end(JSON.stringify({err:false, result:result}));
	// 			else
	// 				res.end(JSON.stringify({err:true, result:'edit discuss error'}));
	// 		});
	// 		break;

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
		case 'discuss-range':
			if(req.session.loginstate != 'true'){
				return res.sendFile(path.dirname(__dirname)+'/public/html/login.html');
			}	
			var range = {from: Number(params.from), to: Number(params.to)};
			console.log('范围时'+params.from+params.to);
			var fields = '*';
			var condition = {type:'disc'};
			discuss.search(fields, range, condition, (err, result)=> {
				if(!err)
					res.end(JSON.stringify({err:false, result:result}));
				else
					res.end(JSON.stringify({err:true, result:'error'}));
			});
			break;

		case 'discuss-state':
			if(req.session.loginstate != 'true'){
				return res.sendFile(path.dirname(__dirname)+'/public/html/login.html');
			}
			console.log('请求更改评论状态');
			var newDiscuss = {
				id:params.id,
				state:params.state
			};

			discuss.edit(newDiscuss, (err, result)=>{
				if(!err)
					res.end(JSON.stringify({err:false, result:result}));
				else
					res.end(JSON.stringify({err:true, result:'edit discuss error'}));
			});
			break;

		// case 'user-del':
		// 	if(req.session.loginstate != 'true'){
		// 		return res.sendFile(path.dirname(__dirname)+'/public/html/login.html');
		// 	}
			
		// 	var condition = {name:params.name};
		// 	user.del(condition, (err, result)=> {
		// 		if(!err)
		// 			res.end(JSON.stringify({err:false, result:result}));
		// 		else
		// 			res.end(JSON.stringify({err:true, result:'delete user error'}));
		// 	});
		// 	break;
		
		default:
			res.end(JSON.stringify({err:true, result:'undefined request action'}));
	}
});
module.exports = router;
