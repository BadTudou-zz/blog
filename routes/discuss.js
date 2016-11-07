'use static';

var express = require('express');
var session = require('express-session');
var router = express.Router();
var discuss = require('../servers/discuss');
var path = require('path');


router.get('/', function(req, res) {
	var params = req.query;
	switch(params.action) {
		case 'discuss-range':
			var range = {from: Number(params.from), to: Number(params.to)};
			var fields = '*';
			var condition = {type:'disc'};
			discuss.search(fields, range, condition, (err, result)=> {
				if(!err)
					res.end(JSON.stringify({err:false, result:result}));
				else
					res.end(JSON.stringify({err:true, result:'error'}));
			});
			break;
		
		default:
			res.end(JSON.stringify({err:true, result:'undefined request action'}));
	}
});
module.exports = router;
