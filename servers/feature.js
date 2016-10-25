var conf = require('../conf/conf.js');
var utility = require('../utility/utility.js');
var database = require('../servers/database.js');
const TABLE_FEATURE = conf.mysql.tables.TABLE_FEATURE;

var add = function add(feature, callback)
{
	
	//专题字段: id, title, timeCreate, author, introduction
	var values = utility.objescape(feature);
	var sqlString = `INSERT INTO ${TABLE_FEATURE} 
	(
		title, author, introduction
	)
	VALUES
	(
		${values.title}, ${values.author}, ${values.introduction}
	)`;
	database.query(sqlString, function(err, result) {
			callback(err || !result.affectedRows, result);
			return  (err || result.affectedRows);
		});
};

var del = function del(condition, callback) {
	database.del(TABLE_FEATURE, condition, callback);
};

var edit = function edit(values, callback) {
	var condition = `id = ` + utility.escape(values.id);
	database.update(TABLE_FEATURE, values, condition, callback);
};

var list = function list(fields, range, callback) {
	database.list(TABLE_FEATURE, fields, range, callback);
};

var search = function search(fields, condition, range, callback) {
	database.search(TABLE_FEATURE, fields, condition, range, callback);
};

exports.add = add;
exports.del = del;
exports.edit = edit;
exports.list = list;
exports.search = search;
