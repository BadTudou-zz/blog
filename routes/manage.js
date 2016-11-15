'use static';

var express = require('express');
var session = require('express-session');
var router = express.Router();
var path = require('path');
var article = require('../servers/article.js');
var user = require('../servers/user.js');
var feature = require('../servers/feature.js');
var discuss = require('../servers/discuss.js');
var utility = require('../utility/utility.js');

router.get('/', function(req, res, next) {
	if(req.session.loginstate == 'true')
		return next();

	console.log('请求manage get'+req.query.action);
	var params = req.query;
	switch(params.action) {
		case 'user-login':
			var fields = 'name';
			var condition = {
				name: params.name,
				password: params.password
			};
			var conditionString = utility.obj2array(condition).join(' AND ');
			var range = {from:0, count:1};
			user.search(fields, conditionString, range, (err, result)=> {
				if(!err && result.length){
					req.session.loginstate = 'true';
					res.end(JSON.stringify({err:false, result:result}));
				}
				else{
					res.end(JSON.stringify({err:true, result:'user not exists or password war wrong'}));
				}

			});
			break;

		default:
			return res.sendFile(path.dirname(__dirname)+'/public/html/manage.html');
	}

});

router.get('/', function(req, res) {
	var params = req.query;
	switch(params.action) {
		case 'user-range':		
			console.log('执行get user-range');		
			var range = {from: Number(params.from), count: Number(params.count)};
			var fields = 'name, nickname, authority, timeCreate';
			user.list(fields, range, (err, result)=> {
				if(!err)
					res.end(JSON.stringify({err:false, result:result}));
				else
					res.end(JSON.stringify({err:true, result:'error'}));
			});
			break;

		case 'discuss-range':
			var range = {from: Number(params.from), count: Number(params.count)};
			var fields = '*';
			var condition = `type  = 'disc'`;
			discuss.search(fields, condition, range, (err, result)=> {
				if(!err)
					res.end(JSON.stringify({err:false, result:result}));
				else
					res.end(JSON.stringify({err:true, result:'error'}));
			});
			break;

		default:
			return res.sendFile(path.dirname(__dirname)+'/public/html/manage.html');
	}
});

// 管理员提交信息
router.put('/', function(req, res) {
	var params = req.query;
	console.log('管理员请求提交信息'+params.action);
	switch(params.action) {
		case 'article-add':
			var newArticle = req.body.newArticle;
			article.add(newArticle, (err, result)=> {
				if(!err)
					res.end(JSON.stringify({err:false, result:result.insertId}));
				else
					res.end(JSON.stringify({err:true, result:'add new article error'}));
			});
			break;

		case 'article-edit':
			var newArticle = req.body.newArticle;
			article.edit(newArticle, (err, result)=>{
				if(!err)
					res.end(JSON.stringify({err:false, result:true}));
				else
					res.end(JSON.stringify({err:true, result:'edit article error'}));
			});
			break;

		case 'article-del':
			var condition = 'id = '+utility.escape(req.body.id);
			article.del(condition, (err, result)=> {
				if(!err)
					res.end(JSON.stringify({err:false, result:result}));
				else
					res.end(JSON.stringify({err:true, result:'delete article error'}));
			});
			break;

		case 'feature-add':
			var newFeature = req.body.feature;
			console.log(JSON.stringify(newFeature));
			feature.add(newFeature, (err, result)=> {
				if(!err)
					res.end(JSON.stringify({err:false, result:result.insertId}));
				else
					res.end(JSON.stringify({err:true, result:'add new feature error'}));

			});
			break;

		case 'feature-edit':
			var newArticle = req.body.feature;
			delete newArticle.timeCreate;
			feature.edit(newArticle, (err, result)=>{
				if(!err)
					res.end(JSON.stringify({err:false, result:true}));
				else
					res.end(JSON.stringify({err:true, result:'edit article error'}));
			});
			break;

		case 'feature-del':
			var condition ='id = '+utility.escape(req.body.id);
			feature.del(condition, (err, result)=> {
				if(!err)
					res.end(JSON.stringify({err:false, result:result}));
				else
					res.end(JSON.stringify({err:true, result:'delete feature error'}));
			});
			break;
			
		case 'discuss-edit':
			var newDiscuss = req.body.discuss;
			delete newDiscuss.timeCreate;
			discuss.edit(newDiscuss, (err, result)=>{
				if(!err)
					res.end(JSON.stringify({err:false, result:result}));
				else
					res.end(JSON.stringify({err:true, result:'edit discuss error'}));
			});
			break;

		case 'user-add':
			var newUser = req.body.user;
			console.log(JSON.stringify(newUser));
			user.add(newUser, (err, result)=> {
				if(!err)
					res.end(JSON.stringify({err:false, result:newUser.name}));
				else
					res.end(JSON.stringify({err:true, result:'add new user error'}));

			});
			break;

		case 'user-edit':
			var newUser = req.body.user;
			console.log(JSON.stringify(newUser));
			user.edit(newUser, (err, result)=>{
				if(!err)
					res.end(JSON.stringify({err:false, result:true}));
				else
					res.end(JSON.stringify({err:true, result:'edit user error'}));
			});
			break;

		case 'user-del':
			var condition = 'name = '+utility.escape(req.body.name);
			user.del(condition, (err, result)=> {
				if(!err)
					res.end(JSON.stringify({err:false, result:result}));
				else
					res.end(JSON.stringify({err:true, result:'delete user error'}));
			});
			break;

		default:
			res.end(JSON.stringify({err:true, result:'undefined request action'}));
			break;
	}

});
module.exports = router;
