var conf = require('../conf/conf.js');
var database = require('../servers/database.js');
var utility = require('../utility/utility.js');
const TABLE_DISCUSS = conf.mysql.tables.TABLE_DISCUSS;
var add = function add(discuss, callback)
{

	/* 字段: id, author, contact, discussID, timeCreate, content, state, mask, type 
		state 'verify':审核, 'pass':通过, 'unpass':未通过
		mask  'groom':推荐, 'dust':垃圾, 'comman':普通
		type  'disc':评论, 'disc_res':回复评论, 'message':留言, 'message_res':回复留言
	*/
	var values = utility.objescape(discuss);
	var sqlString = `INSERT INTO ${TABLE_DISCUSS} 
	(
		author, contact, discussID, 
		content, state, mask, 
		type
	) 
	VALUES
	(
		${values.author}, ${values.contact}, ${values.discussID},
		${values.content}, ${values.state}, ${values.mask},
		${values.type}
	);`;
	database.query(sqlString, function(err, result) {
	 		callback(err || !result.affectedRows, result);
	 		return  (err || result.affectedRows);
	 	});
};

var search = function search(fields, condition, range, callback) {
	database.search(TABLE_DISCUSS, fields, condition, range, callback);
};

var list = function list(fields, range, callback) {
	database.list(TABLE_DISCUSS, fields, range, callback);
};

var edit = function edit(values, callback) {
	var condition = `id = `+utility.escape(values.id);
	database.update(TABLE_DISCUSS, values, condition, callback);
};

var del = function del(condition, callback) {
	database.del(TABLE_DISCUSS, condition, callback);
};

exports.add = add;
exports.search = search;
exports.list = list;
exports.edit = edit;
exports.del = del;