var conf = require('../conf/conf.js');
var utility = require('../utility/utility.js');
var database = require('../servers/database.js');
var fs = require('fs');
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


var edit = function edit(values, callback) {
	var condition = `id = `+utility.escape(values.id);
	database.update(TABLE_ARTICLE, values, condition, callback);
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
	discuss.search(fields, {discussID:articleID, state:'pass', type:'disc'}, (err, result)=>{
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