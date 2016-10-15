var conf = require('../conf/conf.js');
var utility = require('../utility/utility.js');
var database = require('../servers/database.js');
var add = function add(user, callback)
{

	//文章字段：name, nickname, password, question, anser, authority, timeCreate, state
	
	var values = database.escape(utility.objectValues(user));
	var sqlString = `INSERT INTO tb_user (name, nickname, password, question, anser)
		VALUES(${values});`;
	database.query(sqlString, function(err, result)
	 	{
	 		callback(err || !result.affectedRows, result);
	 		return  (err || result.affectedRows);
	 	});
};

var edit = function edit(user, callback) {
	var values = (utility.obj2array(user)).join(' , ')
	var sqlString = `UPDATE tb_user SET ${values} WHERE name = '${user.name}' ;`
	database.query(sqlString, function(err, result) {
		callback(err || !result.affectedRows, result);
	 	return (err || result.affectedRows);
	});

};

var search = function search(fields, condition, callback) {

	var conditionString = (utility.obj2array(condition)).join(' AND ');
	var query = database.query(`SELECT ${fields} FROM tb_user WHERE ${conditionString} ;`, function(err, result) {
		callback(err, result);
	 	return (err);
	});
};

var del = function del(condition, callback)
{
	var conditionString = (utility.obj2array(condition)).join(' AND ');
	var sqlString = `DELETE FROM tb_user WHERE ${conditionString} ;`;
	database.query(sqlString, function(err, result)
	 	{
	 		callback(err || !result.affectedRows, result);
	 		return (err || result.affectedRows);
	 	});
};

exports.add = add;
exports.del = del;
exports.edit = edit;
exports.search = search;