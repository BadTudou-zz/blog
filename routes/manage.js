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
		return res.sendFile(path.dirname(__dirname)+'/public/html/manage.html');
	}
});

router.get('/', function(req, res) {

	switch(params.action) {
		
		default:
			res.end(JSON.stringify({err:true, result:'undefined request action'}));
	}
});

// 管理员提交信息
router.put('/', function(req, res) {
	if(req.session.loginstate != 'true')
		return res.sendFile(path.dirname(__dirname)+'/public/html/manage.html');

	var params = req.query;
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
			var condition = {id:req.body.id};
			article.del(condition, (err, result)=> {
				if(!err)
					res.end(JSON.stringify({err:false, result:result}));
				else
					res.end(JSON.stringify({err:true, result:'delete article error'}));
			});
			break;

		case 'feature-add':
			if(req.session.loginstate != 'true'){
				return res.sendFile(path.dirname(__dirname)+'/public/html/login.html');
			}
			var newFeature = req.body.newFeature;
			console.log(JSON.stringify(newFeature));
			feature.add(newFeature, (err, result)=> {
				if(!err)
					res.end(JSON.stringify({err:false, result:result.insertId}));
				else
					res.end(JSON.stringify({err:true, result:'add new feature error'}));

			});
			break;

		case 'feature-del':
			var condition = {id:params.id};
			feature.del(condition, (err, result)=> {
				if(!err)
					res.end(JSON.stringify({err:false, result:result}));
				else
					res.end(JSON.stringify({err:true, result:'delete feature error'}));
			});
			break;

		case 'discuss-state':
			var newDiscuss = {
				id:req.body.id,
				state:req.body.state
			};

			discuss.edit(newDiscuss, (err, result)=>{
				if(!err)
					res.end(JSON.stringify({err:false, result:result}));
				else
					res.end(JSON.stringify({err:true, result:'edit discuss error'}));
			});
			break;

		case 'user-add':
			if(req.session.loginstate != 'true'){
				return res.sendFile(path.dirname(__dirname)+'/public/html/login.html');
			}
			var newUser = req.body.newUser;
			console.log(JSON.stringify(newUser));
			user.add(newUser, (err, result)=> {
				if(!err)
					res.end(JSON.stringify({err:false, result:newUser.name}));
				else
					res.end(JSON.stringify({err:true, result:'add new user error'}));

			});
			break;

		case 'user-range':
			if(req.session.loginstate != 'true'){
				return res.sendFile(path.dirname(__dirname)+'/public/html/login.html');
			}
				
			var range = {from: Number(params.from), to: Number(params.to)};
			var fields = 'name, nickname, authority, timeCreate';
			user.list(fields, range, (err, result)=> {
				if(!err)
					res.end(JSON.stringify({err:false, result:result}));
				else
					res.end(JSON.stringify({err:true, result:'error'}));
			});
			break;

		case 'user-del':
			if(req.session.loginstate != 'true'){
				return res.sendFile(path.dirname(__dirname)+'/public/html/login.html');
			}
			
			var condition = {name:params.name};
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
