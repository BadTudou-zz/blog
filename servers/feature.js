var conf = require('../conf/conf.js');
var utility = require('../utility/utility.js');
var database = require('../servers/database.js');

var add = function add(feature, callback)
{
	
	//专题字段: id, title, timeCreate, author, introduction
	var sqlString = `INSERT INTO tb_feature (title, author, introduction)
		VALUES('${feature.title}', '${feature.author}', '${feature.introduction}')`;
	database.query(sqlString, function(err, result) {
			callback(err || !result.affectedRows, result);
			return  (err || result.affectedRows);
		});
};

var del = function del(condition, callback) {
	var conditionString = (utility.obj2array(condition)).join(' AND ');
	var sqlString = `DELETE FROM tb_feature WHERE ${conditionString} ;`;
	database.query(sqlString, function(err, result) {
	 		callback(err || !result.affectedRows, result);
	 		return (err || result.affectedRows);
	 	});
};

var edit = function edit(feature, callback) {
	
	var values = (utility.obj2array(feature)).join(' , ');
	var sqlString = `UPDATE tb_feature SET ${values} WHERE id = ${feature.id} ;`;
	database.query(sqlString , function(err, result) {
		callback(err || !result.affectedRows, result);
	 	return (err || result.affectedRows);
	});

};

var list = function list(fields, range, callback) {
	
	var sqlString;
	if(!range)
		sqlString = `SELECT ${fields} FROM tb_feature`;
	else
		sqlString = `SELECT ${fields} FROM tb_feature LIMIT ${range.from},${range.to};`
	
	database.query(sqlString, function(err, result) {
		callback(err, result);
	 	return (err);
	});
};

var search = function search(fields, condition, callback) {
	
	var conditionString = (utility.obj2array(condition)).join(' AND ');
	var sqlString = `SELECT ${fields} FROM tb_feature WHERE ${conditionString} ;`;
	database.query(sqlString, function(err, result) {
		callback(err, result);
	 	return (err);
	});
};

exports.add = add;
exports.del = del;
exports.edit = edit;
exports.list = list;
exports.search = search;
