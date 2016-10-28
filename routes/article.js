'use static';

var express = require('express');
var router = express.Router();
var article = require('../servers/article.js');
var utility = require('../utility/utility');
var path = require('path');

router.get('/', function(req, res, next) {
	var params = req.query;
	var count = Object.keys(params).length;
	if(Object.keys(params).length === 0)
		return res.end('静态网页处理');
	else
		next();
});

router.put('/', function(req, res) {
	
	var params = req.query;
	if(typeof(params.action) === 'undefined')
	{
		return res.end(JSON.stringify({err:true, result:'illegal request action'}));
	}
	switch(params.action) 
	{
		case 'article-discuss':
			var newDiscuss = req.body.newDiscuss;
			console.log(JSON.stringify(newDiscuss));
			article.addDiscuss(newDiscuss, (err, result)=>
			{
				if(!err)
					res.end(JSON.stringify({err:false, result:true}));
				else
					//res.end(JSON.stringify({err:true, result:JSON.stringify(err)}));
					res.end(JSON.stringify({err:true, result:'add disscuss to article error'}));
			});
			break; 

		case 'article-search':
			var fields = '*';
			var condition = utility.objescape(req.body.condition);
			var range = {from: Number(req.body.from), count: Number(req.body.count)};
			console.log(JSON.stringify(condition));
			article.search(fields, condition, range, (err, result) =>{
				if(!err)
				{
					res.end(JSON.stringify({err:false, result:result}));
					console.log(JSON.stringify(result));
				}
				else
					res.end(JSON.stringify({err:true, result:'search article error'}));
				});
			break;
		
		default:
			res.sendFile(path.dirname(__dirname)+'/public/html/login.html');
			break;
	}
});

router.put('/', function(req, res) {
	var params = req.query;
	if(typeof(params.action) === 'undefined')
	{
		return res.end(JSON.stringify({err:true, result:'illegal request action'}));
	}
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
		
	}

});

router.get('/', function(req, res) {
	var params = req.query;
	if(typeof(params.action) === 'undefined')
	{
		return res.end(JSON.stringify({err:true, result:'illegal request action'}));
	}
	switch(params.action) {
		case 'article-range':
			var fields = `id, featureID, title, subtitle, link, license, timeCreated, 
						author, introduction, coverLink`;
			var range = {from: Number(params.from), count: Number(params.count)};
			article.list(fields, range, (err, result)=> {
				if(!err)
					res.end(JSON.stringify({err:false, result:result}));
				else
					res.end(JSON.stringify({err:true, result:'get article range error'}));
			});
			break;

		case 'article-show':
			var id = params.id;
			res.sendFile(path.dirname(__dirname)+'/public/html/article.html');
			break;

		case 'article-edit':
			if(req.session.loginstate != 'true'){
				return res.sendFile(path.dirname(__dirname)+'/public/html/login.html');
			}
			var id = params.id;
			res.sendFile(path.dirname(__dirname)+'/public/html/article-new.html');
			break;

		case 'article-new':
			if(req.session.loginstate == 'true'){
				res.sendFile(path.dirname(__dirname)+'/public/html/article-new.html');
			}
			else{
				res.sendFile(path.dirname(__dirname)+'/public/html/login.html');
			}
			break;

		case 'article-del':
			if(req.session.loginstate != 'true'){
				return res.sendFile(path.dirname(__dirname)+'/public/html/login.html');
			}

			var condition = {id:params.id};
			article.del(condition, (err, result)=> {
				if(!err)
					res.end(JSON.stringify({err:false, result:result}));
				else
					res.end(JSON.stringify({err:true, result:'delete article error'}));
			});
			break;

		case 'article-discuss':
			var articleID = params.id;
			article.getDiscuss(articleID, (err, result)=>{
				if(!err)
					res.end(JSON.stringify({err:false, result:result}));
				else
					res.end(JSON.stringify({err:true, result:'get article disscuss error'}));
			});
			break;


		default:
			res.end(JSON.stringify({err:true, result:'undefined request action'}));
	}
});
module.exports = router;
