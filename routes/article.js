'use static';

var express = require('express');
var router = express.Router();
var article = require('../servers/article.js');
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
	switch(params.action) {
		case 'article-add':
			var newArticle = req.body.newArticle;
			console.log(newArticle);
			res.end('end article-add');
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
			var fields = params.fields;
			var range = {from: Number(params.from), to: Number(params.to)};
			article.list(fields, range, (err, result)=> {
				if(!err)
					res.end(JSON.stringify(result));
				else
					res.end(JSON.stringify({err:true, result:'error'}));
			});
			break;

		case 'article-all':
			var fields = params.fields;
			article.list(fields, null, (err, result)=> {
				if(!err)
					res.end(JSON.stringify(result));
				else
					res.end(JSON.stringify({err:true, result:'error'}));
			});
			break;

		case 'article-search':
			var conditionArray = params.condition.split(',');
			var fields = params.fields;
			var condition = {};
			for(var item in conditionArray) {
				var ele = conditionArray[item];
				var index = ele.indexOf(':');
				var proto = ele.substring(0, index);
				var value = ele.substr(index+1);
				condition[proto] = value;
			}
			article.search(fields, condition, (err, result)=> {
				if(!err)
					res.end(JSON.stringify(result));
				else
					res.end(JSON.stringify({err:true, result:'error'}));
			});
			break;

		case 'article-show':
			var id = params.id;
			res.sendFile(path.dirname(__dirname)+'/public/html/article.html');
			break;

		case 'article-new':
			//var id = params.id;
			res.sendFile(path.dirname(__dirname)+'/public/html/article-new.html');
			break;

		default:
			res.end(JSON.stringify({err:true, result:'undefined request action'}));
	}
});
module.exports = router;
