var conf = require('../conf/conf.js');
var utility = require('../utility/utility.js');
var database = require('../servers/database.js');
var fs = require('fs');
var path = require('path');
var markdown = require('markdown').markdown;
var discuss = require('../servers/discuss.js');
var add = function add(article, callback)
{

	//文章字段：id, featureID, title, subtitle, link, license, timeCreated, 
	//		timeRelease, timeModify, author, introduction, coverLink, 
	//		content, countRead, countShare, countDiscuss, labels
	var values = database.escape(utility.objectValues(article));
	var sql = `INSERT INTO tb_article (featureID, title, subtitle, author, link, license, 
		timeRelease, introduction, coverLink, content, labels)
		VALUES(${values});`;
	database.query(sql, function(err, result)
	 	{
	 		if(!err){
	 			rendertoHTML(article, (err)=>{
	 				callback(err || !result.affectedRows, result);
	 				return false;
	 			});
	 		}
	 		callback(err || !result.affectedRows, result);
	 		return  (err || result.affectedRows);
	 	});
};

var del = function del(condition, callback)
{
	var conditionString = (utility.obj2array(condition)).join(' AND ');
	var sqlString = `DELETE FROM tb_article WHERE ${conditionString} ;`;
	database.query(sqlString, function(err, result)
	 	{
	 		callback(err || !result.affectedRows, result);
	 		return (err || result.affectedRows);
	 	});
};

var edit = function edit(article, callback) {
	var values = utility.obj2array(article).join(' , ');
	var sqlString = `UPDATE tb_article SET ${values} WHERE id = ${article.id} ;`;
	database.query(sqlString, function(err, result) {
		if(!err){
	 			rendertoHTML(article, (err)=>{
	 				callback(err || !result.affectedRows, result);
	 				return false;
	 			});
	 		}
		callback(err || !result.affectedRows, result);
	 	return (err || result.affectedRows);
	});
};

var list = function list(fields, range, callback) {
	var sql;
	if(!range)
		sql = `SELECT ${fields} FROM tb_article`;
	else
		sql = `SELECT ${fields} FROM tb_article LIMIT ${range.from},${range.to};`
	
	database.query(sql, function(err, result) {
		callback(err, result);
	 	return (err);
	});

};

var search = function search(fields, condition, callback) {
	var conditionString = (utility.obj2array(condition)).join(' AND ');
	var sql = `SELECT ${fields} FROM tb_article WHERE ${conditionString} ;`;
	database.query(sql, function(err, result) {
		callback(err, result);
	 	return (err);
	});
};

var addDiscuss = function addDiscuss(newDiscuss, callback){

	newDiscuss.state='verify';
	newDiscuss.mask='comman';
	newDiscuss.type='disc';
	discuss.add(newDiscuss, (err)=>{
		callback(err);
	});
};

var getDiscuss = function getDiscuss(articleID, callback){
	var fields = 'id, author, discussID, timeCreate, content';
	discuss.search(fields, {discussID:articleID, state:'pass', type:'disc'}, (err, result)=>{
		callback(err, result);
		return err;
	});
};

var rendertoHTML = function renderMD(article, callback){
	var rootPath = path.dirname(__dirname);
	var sysconf = conf.system;
	var htmlpath = rootPath+sysconf.articleStorePath+article.link+'.html';
	var mdhtml = markdown.toHTML(article.content);
	var titlehtml = '<!DOCTYPE html><html><head><meta charset="utf-8"><title>'+article.title+article.subtitle;
	var linkhtml = '</title><link rel="stylesheet" type="text/css" href="stylesheets/'+sysconf.articleCssName+'"></head><body>';
	var pughtml = titlehtml+linkhtml+mdhtml+'</body></html>';
	fs.writeFile(htmlpath, pughtml, (err) => {
          callback(err);
          return err;
      });
};


exports.add = add;
exports.del = del;
exports.edit = edit;
exports.list = list;
exports.search = search;
exports.addDiscuss = addDiscuss;
exports.getDiscuss = getDiscuss;