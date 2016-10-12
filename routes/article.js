'use static';

var express = require('express');
var router = express.Router();
var article = require('../servers/article.js');

router.get('/', function(req, res, next) {
	var params = req.query;
	var count = Object.keys(params).length;
	if(Object.keys(params).length === 0)
		return res.end('静态网页处理');
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
		case 'list-range':
			var range = {from: Number(params.from), to: Number(params.to)};
			article.list(range, (err, result)=> {
				if(!err)
					res.end(JSON.stringify(result));
				else
					res.end(JSON.stringify({err:true, result:'error'}));
			});
			break;

		case 'list-all':
			article.list(null, (err, result)=> {
				if(!err)
					res.end(JSON.stringify(result));
				else
					res.end(JSON.stringify({err:true, result:'error'}));
			});
			break;

		case 'list-search':
			var conditionArray = params.condition.split(',');
			console.log(conditionArray);
			var condition = {};
			for(var item in conditionArray) {
				var ele = conditionArray[item];
				var index = ele.indexOf(':');
				var proto = ele.substring(0, index);
				var value = ele.substr(index+1);
				condition[proto] = value;
			}
			article.search(condition, (err, result)=> {
				if(!err)
					res.end(JSON.stringify(result));
				else
					res.end(JSON.stringify({err:true, result:'error'}));
			});
			break;

		default:
			res.end(JSON.stringify({err:true, result:'undefined request action'}));
	}
});
module.exports = router;
