var conf = require('../conf/conf.js');
var utility = require('../utility/utility.js');
var database = require('../servers/database.js');
const fs = require('fs');
var path = require('path');
var markdown = require('markdown').markdown;
var discuss = require('../servers/discuss.js');
const TABLE_ARTICLE = conf.mysql.tables.TABLE_ARTICLE;

/**
 * [添加]
 * @param {[object]}   article  [含有所有字段属性的对象]
 * @param {Function}   callback [回调函数]
 * @return {[Object/boolean]}  	 [有错误:Object;无错误;false]
 */
var add = function add(article, callback)
{

	//文章字段：id, featureID, title, subtitle, link, license, timeCreated, 
	//		timeRelease, timeModify, author, introduction, coverLink, 
	//		content, countRead, countShare, countDiscuss, labels
	console.log(JSON.stringify(article));
	var values = utility.objescape(article);
	var sqlString = `INSERT INTO ${TABLE_ARTICLE}
		(
			featureID, title, subtitle, 
			author, link, license, 
			timeRelease, introduction, coverLink,
			content, labels
		)
		VALUES
		(
			${values.featureID}, ${values.title}, ${values.subtitle},
			${values.author}, ${values.link}, ${values.license}, 
			${values.timeRelease}, ${values.introduction}, ${values.coverLink},
			${values.content}, ${values.labels}
		);`;
		database.query(sqlString, function(err, result) {
	 		if(!err) {
	 			article.link = article.link.slice(1, -1);
				article.title = article.title.slice(1,-1);
				article.subtitle = article.subtitle.slice(1,-1);
				article.content = article.content.slice(1,-1);
	 			rendertoHTML(article, (err)=>{
	 				callback(err || !result.affectedRows, result);
	 				return false;
	 			});
	 		}
	 		else {
	 			callback(err || !result.affectedRows, result);
	 			return  (err || result.affectedRows);
	 		}
	 		
	 	});
};


var edit = function edit(article, callback) {
	//var values = utility.objescape(article);
	var condition = `id = `+(article.id);
	database.update(TABLE_ARTICLE, article, condition, (err, result)=>
	{
		if(!err) {
			rendertoHTML(article, (err)=>{
	 			callback(err);
	 		});
	 	}
	 	else{
	 		callback(err || !result.affectedRows, result);
	 	}
	});
};

var list = function list(fields, range, callback) {
	database.list(TABLE_ARTICLE, fields, range, callback);
};

var search = function search(fields, condition, range, callback) {
	database.search(TABLE_ARTICLE, fields, condition, range, callback);
};

var del = function del(condition, callback) {
	database.del(TABLE_ARTICLE, condition, callback);
};


/**
 * [添加评论]
 * @param {[Object]}   newDiscuss [评论]
 * @param {Function}   callback   [回调函数]
 */
var addDiscuss = function addDiscuss(newDiscuss, callback) {
	newDiscuss.state='verify';
	newDiscuss.mask='comman';
	newDiscuss.type='disc';
	discuss.add(newDiscuss, (err)=> {
		callback(err);
	});
};


var getDiscuss = function getDiscuss(articleID, callback){
	var fields = 'id, author, discussID, timeCreate, content';
	var conditionObj = {discussID:articleID, state:'pass', type:'disc'};
	var condition = utility.obj2array(conditionObj).join(' AND ');
	var range = {from:0, count:100};
	console.log(condition);
	discuss.search(fields, condition, range, (err, result)=>{
		callback(err, result);
		return err;
	});
};

/**
 * [解析为HTML]
 * @param  {[Object]}   article  [含有所有字段属性的对象]
 * @param  {Function}   callback [回调函数]
 * @return {[Object/boolean]}  	 [有错误:Object;无错误;false]
 */
var rendertoHTML = function renderMD(article, callback){
	var rootPath = path.dirname(__dirname);
	var articleConf = conf.article;
	var htmlpath = rootPath+articleConf.storePath+'/'+article.link+'.html';
	var mdhtml = markdown.toHTML(article.content);
	var titlehtml = '<!DOCTYPE html><html><head><meta charset="utf-8"><title>'+article.title+article.subtitle;
	var linkhtml = '</title><link rel="stylesheet" type="text/css" href="stylesheets/'+articleConf.css+'"></head><body>';
	var pughtml = titlehtml+linkhtml+mdhtml+'</body></html>';
	console.log('解析的MD'+article.content);
	console.log('解析后的'+mdhtml);
	fs.writeFile(htmlpath, pughtml, (err) => {
			console.log('创建HTML'+htmlpath+(!err));
          callback(err);
      });
};


exports.add = add;
exports.del = del;
exports.edit = edit;
exports.list = list;
exports.search = search;
exports.addDiscuss = addDiscuss;
exports.getDiscuss = getDiscuss;