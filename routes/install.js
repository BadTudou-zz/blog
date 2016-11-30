var express = require('express');
var path = require('path');
var router = express.Router();
var mysql = require('mysql');
var conf = require('../conf/conf.js');
var user = require('../servers/user.js');
var md5 = require('md5');
var models = require('../models/models.js');
/* GET home page. */
router.get('/', function(req, res) {
	res.sendFile(path.dirname(__dirname)+'/public/html/install.html');
});

router.put('/', function(req, res) {
	var params = req.query;
	switch(params.action) {
		case 'database-test':
			var mysqlConf = req.body.mysql;
			var pool  = mysql.createPool(mysqlConf);
			pool.getConnection(function(err, connection){
				if(!err){
					console.log('测试成功');
					conf.mysql = mysqlConf;
					console.log('配置'+JSON.stringify(conf.mysql));
				}
				res.end(JSON.stringify({err:err}));
			});
			break;

		case 'database-init':
			var pool  = mysql.createPool(conf.mysql);
			var tables = req.body.tables;
			conf.mysql.tables = tables;
			pool.getConnection(function(err, connection){
				if(!err){
					for(sqlString in models){
						connection.query(models[sqlString], function(err, result) {
	 						if(!err) {
								console.log('创建'+sqlString+'成功');
							}
							else{
								console.log('创建'+sqlString+'失败'+JSON.stringify(err));
							}
						});
					}
				}
			});
			res.end(JSON.stringify({err:false}));
			break;

		case 'master-add':
			var newUser = req.body.master;
				newUser.password = md5(newUser.password);
				console.log(JSON.stringify(newUser));
				user.add(newUser, (err, result)=> {
					if(!err)
						res.end(JSON.stringify({err:false, result:newUser.name}));
					else
						res.end(JSON.stringify({err:true, result:'add new master error'}));

				});
			break;
	}
});

module.exports = router;
