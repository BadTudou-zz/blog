'use static';

const fs = require('fs');
var express = require('express');
var session = require('express-session');
var conf = require('../conf/conf.js');
var router = express.Router();
var path = require('path');
var md5 = require('md5');
var database = require('../servers/database.js');
var article = require('../servers/article.js');
var user = require('../servers/user.js');
var feature = require('../servers/feature.js');
var discuss = require('../servers/discuss.js');
var visitor = require('../servers/visitor.js');
var utility = require('../utility/utility.js');

var backupDatabase  = function backupDatabase(callback){
	var databaseConf = conf.database;
	var mysqlTables = conf.mysql.tables;
	var currentDate = new Date();
	var backupFileName = currentDate.getFullYear()+'-'
		+(currentDate.getMonth()+1)+'-'+currentDate.getDate()
		+' '+currentDate.getHours()+':'+currentDate.getMinutes()
		+':'+currentDate.getSeconds();
	backupFileName = databaseConf.storePath+'/'+backupFileName;
	var backupStep = 0;
	var keys = Object.keys(conf.mysql.tables);
	var tableCount = keys.length;
	for(table in conf.mysql.tables){
		database.backup(conf.mysql.tables[table],backupFileName+' '+table+'.sql',(err)=>{
			if(err){
				console.log('导出'+JSON.stringify(err));
				callback(JSON.stringify({err:err, result:err}));
			}
			else{
				backupStep++;
				if (backupStep == tableCount){
					utility.compress(backupFileName+'*.sql', backupFileName + '.zip');
				}
			}
		});
	}
	callback(JSON.stringify({err:false, result:'success'}));
};


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
				password: md5(params.password)
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

		case 'conf-website':
			res.end(JSON.stringify({err:false, result:conf.website}));
			break;

		case 'conf-master':
			res.end(JSON.stringify({err:false, result:conf.master}));
			break;

		default:
			res.end(JSON.stringify({err:true, result:'undefined request action'}));
			break;
	}

});

router.get('/', function(req, res) {
	var params = req.query;
	switch(params.action) {
		case 'user-login':
			res.end(JSON.stringify({err:false, result:true}));
			break;

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

		case 'visitor-range':
			var range = {from: Number(params.from), count: Number(params.count)};
			var fields = '*';
			visitor.list(fields, range, (err, result)=> {
				if(!err)
					res.end(JSON.stringify({err:false, result:result}));
				else
					res.end(JSON.stringify({err:true, result:'error'}));
			});
			break;

		case 'blog-state':
			var days = Number(params.days);
			var timestamp = Date.parse(new Date()) - days * 24 * 60 * 60 * 60;
			var dateBegin = new Date(timestamp);
			var formatDate = ''+dateBegin.getFullYear()+'-'+(dateBegin.getMonth()+1)+'-'+dateBegin.getDate();
			var range = null;
			timestamp = timestamp / 1000;
			visitor.search('id', `timeVisited >= '${formatDate}'`, range, (err, resultVisitor)=>{
				if(!err)
				{
					discuss.search('id', `timeCreate >= '${formatDate}'`, range, (err, resultDiscuss)=>{
						if(!err){
							var result = {visitorCount:resultVisitor.length, discussCount:resultDiscuss.length};
							res.end(JSON.stringify({err:false, result:result}));
						}
					});
				}
				else
					res.end(JSON.stringify({err:true, result:'error'}));
			});
			break;

		case 'backup-download':
			var filename = params.database;
			res.download(conf.database.storePath+'/'+filename, filename, (err)=>{
				res.end(JSON.stringify({err:err, result:null}));
			});
			break;

		case 'conf-website':
			res.end(JSON.stringify({err:false, result:conf.website}));
			break;

		case 'conf-master':
			res.end(JSON.stringify({err:false, result:conf.master}));
			break;

		case 'conf-article':
			res.end(JSON.stringify({err:false, result:conf.article}));
			break;

		case 'conf-database':
			res.end(JSON.stringify({err:false, result:conf.database}));
			break;

		case 'conf-article-csslist':
			res.end(JSON.stringify({err:false, result:conf.articleCssList}));
			break;

		case 'backup-list':
			fs.readdir(conf.database.storePath, 'utf8', (err, files)=>{
				console.log(err);
				console.log(files);
				res.end(JSON.stringify({err:err, result:files}));
			});
			break;

		default:
			res.end(JSON.stringify({err:true, result:'undefined request action'}));
			break;
	}
});

// 管理员提交信息
router.put('/', function(req, res) {
	if(req.session.loginstate != 'true')
		return res.end(JSON.stringify({err:true, result:'non-privileged put action'}));

	var params = req.query;
	console.log('管理员请求提交信息'+params.action);
	switch(params.action) {
		case 'article-add':
			var newArticle = req.body.article;
			var currentDate = new Date();
			newArticle.license = '';
			newArticle.timeRelease = currentDate.getFullYear()+'-'
			+(currentDate.getMonth()+1)+'-'+currentDate.getDate()
			+' '+currentDate.getHours()+':'+currentDate.getMinutes()
			+':'+currentDate.getSeconds();
			article.add(newArticle, (err, result)=> {
				if(!err)
					res.end(JSON.stringify({err:false, result:result.insertId}));
				else
					res.end(JSON.stringify({err:true, result:'add new article error'}));
			});
			break;

		case 'article-edit':
			var newArticle = req.body.article;
			delete newArticle.timeCreated;
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

		case 'discuss-del':
			var condition ='id = '+utility.escape(req.body.id);
			discuss.del(condition, (err, result)=> {
				if(!err)
					res.end(JSON.stringify({err:false, result:result}));
				else
					res.end(JSON.stringify({err:true, result:'delete discuss error'}));
			});
			break;

		case 'user-add':
			var newUser = req.body.user;
			newUser.password = md5(newUser.password);
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

		case 'visitor-del':
			var condition = 'id = '+utility.escape(req.body.id);
			visitor.del(condition, (err, result)=> {
				if(!err)
					res.end(JSON.stringify({err:false, result:result}));
				else
					res.end(JSON.stringify({err:true, result:'delete visitor error'}));
			});
			break;

		case 'backup-add':
			backupDatabase((result)=>{
				res.end(result);
			});
			break;

		case 'backup-del':
			var filename = req.body.database;
			fs.unlink(conf.database.storePath+'/'+filename, (err)=>{
				res.end(JSON.stringify({err:err, result:null}));
			});
			break;

		case 'conf-website':
			conf.website = req.body.conf;
			res.end(JSON.stringify({err:false, result:'success'}));
			break;

		case 'conf-master':
			conf.master = req.body.conf;
			res.end(JSON.stringify({err:false, result:'success'}));
			break;

		case 'conf-article':
			conf.article = req.body.conf;
			res.end(JSON.stringify({err:false, result:'success'}));
			break;

		case 'conf-database':
			var intervalID = null;
			conf.database = req.body.conf;
			if(req.body.conf.autoBackup){
				intervalID = setInterval(function(){
					backupDatabase((result)=>{
						;
					});
				}, req.body.conf.interval * 60*1000);
			}
			else{
				clearInterval(intervalID);
			}
			res.end(JSON.stringify({err:false, result:'success'}));
			break;

		default:
			res.end(JSON.stringify({err:true, result:'undefined put action'}));
			break;
	}

});
module.exports = router;
