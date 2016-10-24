var database = require('../servers/database.js');
var utility = require('../utility/utility.js');
var add = function add(discuss, callback)
{

	/* 字段: id, author, contact, discussID, timeCreate, content, state, mask, type 
		state 'verify':审核, 'pass':通过, 'unpass':未通过
		mask  'groom':推荐, 'dust':垃圾, 'comman':普通
		type  'disc':评论, 'disc_res':回复评论, 'message':留言, 'message_res':回复留言
	*/
	var values = database.escape(utility.objectValues(discuss));
	var sql = `INSERT INTO tb_discuss (author, contact, discussID, content, state, mask, 
		type) VALUES(${values});`;
		database.query(sql, function(err, result)
	 	{
	 		callback(err || !result.affectedRows, result);
	 		return  (err || result.affectedRows);
	 	});
};

var search = function search(fields, range, condition, callback) {
	var conditionString = (utility.obj2array(condition)).join(' AND ');
	var sql = `SELECT ${fields} FROM tb_discuss WHERE ${conditionString} LIMIT ${range.from},${range.to};`;
	console.log(sql);
	database.query(sql, function(err, result) {
		callback(err, result);
	 	return (err);
	});
};

var list = function list(fields, range, callback) {
	var sql;
	if(!range)
		sql = `SELECT ${fields} FROM tb_discuss`;
	else
		sql = `SELECT ${fields} FROM tb_discuss LIMIT ${range.from},${range.to};`
	
	database.query(sql, function(err, result) {
		callback(err, result);
	 	return (err);
	});

};

var edit = function edit(discuss, callback) {
	
	var values = (utility.obj2array(discuss)).join(' , ');
	var sqlString = `UPDATE tb_discuss SET ${values} WHERE id = ${discuss.id} ;`;
	database.query(sqlString , function(err, result) {
		callback(err || !result.affectedRows, result);
	 	return (err || result.affectedRows);
	});

};

exports.add = add;
exports.search = search;
exports.list = list;
exports.edit = edit;