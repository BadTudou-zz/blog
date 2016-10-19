'use static';

var express = require('express');
var router = express.Router();
var feature = require('../servers/feature.js');

router.put('/', function(req, res) {
	var params = req.body;
	if(typeof(params.action) === 'undefined')
	{
		return res.end(JSON.stringify({err:true, result:'illegal request action'}));
	}
	switch(params.action) {
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

		default:
			res.end(JSON.stringify({err:true, result:'undefined request action'}));


		}
});

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
		case 'feature-range':
			var range = {from: Number(params.from), to: Number(params.to)};
			var fields = params.fields;
			feature.list(fields, range, (err, result)=> {
				if(!err)
					res.end(JSON.stringify({err:false, result:result}));
				else
					res.end(JSON.stringify({err:true, result:'error'}));
			});
			break;

		case 'feature-all':
			var fields = params.fields;
			feature.list(fields, null, (err, result)=> {
				if(!err)
					res.end(JSON.stringify({err:false, result:result}));
				else
					res.end(JSON.stringify({err:true, result:'error'}));
			});
			break;

		case 'feature-search':
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
			feature.search(fields, condition, (err, result)=> {
				if(!err)
					res.end(JSON.stringify({err:false, result:result}));
				else
					res.end(JSON.stringify({err:true, result:'error'}));
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

		default:
			res.end(JSON.stringify({err:true, result:'undefined request action'}));
	}
});
module.exports = router;
