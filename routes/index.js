var express = require('express');
var session = require('express-session');
var md5 = require('md5');
var visitor = require('../servers/visitor.js');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {

	if(!req.session.uid){
		console.log('之前没访问过');
		var ua = req.headers['user-agent'];
		var token = md5(ua.toString());
		req.session.uid = token;
		visitor.add({token:token, ua:ua}, (err, result)=>{
			//TODO:错误处理
		});
	}
	else
	{
		console.log('之前访问过');
	}
	
	res.sendFile(path.dirname(__dirname)+'/public/html/index.html');
});

module.exports = router;
