var conf = require('../conf/conf.js');
var utility = require('../utility/utility.js');
var database = require('../servers/database.js');
var add = function add(article, callback)
{
	database.connection((err, connection)=>
	{
		if(err)
		{
			callback(err);
			return false;
		}
		//文章字段：id, featureID, title, subtitle, link, license, timeCreated, 
		//		timeRelease, timeModify, author, introduction, coverLink, 
		//		content, countRead, countShare, countDiscuss, labels
		
		var values = connection.escape(utility.objectValues(article));
		
		connection.query(`INSERT INTO tb_article (featureID, title, subtitle, author, link, license, 
			timeRelease, introduction, coverLink, content, labels)
			VALUES(${values});`, function(err, result)
		 	{
		 		callback(err || !result.affectedRows, result);
		 		return  (err || result.affectedRows);
		 	});
	});
};

var del = function del(article, callback)
{
	database.connection((err, connection)=>
	{
		if(err)
		{
			callback(err);
			return false;
		}

		connection.query('DELETE FROM tb_article WHERE ? ;', article, function(err, result)
		 	{
		 		callback(err || !result.affectedRows, result);
		 		return (err || result.affectedRows);
		 	});
	});
};

var edit = function edit(article, callback) {
	database.connection((err, connection)=> {
		if(err) {
			callback(err, null);
			return false;
		}
		var values = connection.escape(utility.objectValues(article));

		connection.query(`UPDATE tb_article SET ? WHERE id = ${article.id} ;`, article, function(err, result) {
			callback(err || !result.affectedRows, result);
		 	return (err || result.affectedRows);
		});
	});

};

var list = function list(fields, range, callback) {
	database.connection((err, connection)=> {
		if(err) {
			callback(err, null);
			return false;
		}
		var sql;
		if(!range)
			sql = `SELECT ${fields} FROM tb_article`;
		else
			sql = `SELECT ${fields} FROM tb_article LIMIT ${range.from},${range.to};`
		connection.query(sql, function(err, result) {
			callback(err, result);
		 	return (err);
		});
	});
};

var search = function search(fields, condition, callback) {
	database.connection((err, connection)=> {
		if(err) {
			callback(err, null);
			return false;
		}
		//var fields = connection.escape(fields);
		console.log(`SELECT `+fields +` FROM tb_article WHERE ? ;`);
		connection.query(`SELECT ${fields} FROM tb_article WHERE ? ;`, condition, function(err, result) {
			callback(err, result);
		 	return (err);
		});
	});
};


exports.add = add;
exports.del = del;
exports.edit = edit;
exports.list = list;
exports.search = search;