var conf = require('../conf/conf.js');
var utility = require('../utility/utility.js');
var database = require('../servers/database.js');
const TABLE_USER = conf.mysql.tables.TABLE_USER;

var add = function add(user, callback)
{

	//文章字段：name, nickname, password, question, anser, authority, timeCreate, state
	var values = utility.objescape(user);
	var sqlString = `INSERT INTO ${TABLE_USER} 
	(
		name, nickname, password, 
		question, anser, authority
	)
	VALUES
	(
		${values.name}, ${values.nickname}, ${values.password}, 
		${values.question}, ${values.anser}, ${values.authority}
	);`;
	database.query(sqlString, function(err, result)
	 	{
	 		callback(err || !result.affectedRows, result);
	 		return  (err || result.affectedRows);
	 	});
};

var edit = function edit(values, callback) {
	var condition = `name = ` + utility.escape(values.name);
	console.log(condition);
	database.update(TABLE_USER, values, condition, callback);
};

var search = function search(fields, condition, range, callback) {
	database.search(TABLE_USER, fields, condition, range, callback);
};

var list = function list(fields, range, callback) {
	database.list(TABLE_USER, fields, range, callback);
};

var del = function del(condition, callback) {
	database.del(TABLE_USER, condition, callback);
};

exports.add = add;
exports.del = del;
exports.edit = edit;
exports.search = search;
exports.list = list;