var conf = require('../conf/conf.js');
var utility = require('../utility/utility.js');
var database = require('../servers/database.js');
const TABLE_VISITOR = conf.mysql.tables.TABLE_VISITOR;

var add = function add(visitor, callback)
{
	
	//专题字段: id, token, timeVisited, ua
	var values = utility.objescape(visitor);
	var sqlString = `INSERT INTO ${TABLE_VISITOR} 
	(
		token, ua
	)
	VALUES
	(
		${values.token}, ${values.ua}
	)`;
	database.query(sqlString, function(err, result) {
			callback(err || !result.affectedRows, result);
			return  (err || result.affectedRows);
		});
};

var del = function del(condition, callback) {
	database.del(TABLE_VISITOR, condition, callback);
};

var edit = function edit(values, callback) {
	var condition = `id = ` + utility.escape(values.id);
	database.update(TABLE_VISITOR, values, condition, callback);
};

var list = function list(fields, range, callback) {
	database.list(TABLE_VISITOR, fields, range, callback);
};

var search = function search(fields, condition, range, callback) {
	database.search(TABLE_VISITOR, fields, condition, range, callback);
};

exports.add = add;
exports.del = del;
exports.edit = edit;
exports.list = list;
exports.search = search;
