var conf = require('../conf/conf.js');
var utility = require('../utility/utility.js');
var database = require('../servers/database.js');
var add = function add(user, callback)
{
	database.connection((err, connection)=>
	{
		if(err)
		{
			callback(err);
			return false;
		}
		//文章字段：name, nickname, password, question, anser, authority, timeCreate, state
		
		var values = connection.escape(utility.objectValues(user));
		
		connection.query(`INSERT INTO tb_user (name, nickname, password, question, anser)
			VALUES(${values});`, function(err, result)
		 	{
		 		callback(err || !result.affectedRows, result);
		 		return  (err || result.affectedRows);
		 	});
	});
};

var edit = function edit(user, callback) {
	database.connection((err, connection)=> {
		if(err) {
			callback(err, null);
			return false;
		}

		connection.query(`UPDATE tb_user SET ? WHERE name = '${user.name}' ;`, user, function(err, result) {
			callback(err || !result.affectedRows, result);
		 	return (err || result.affectedRows);
		});
	});

};

var search = function search(fields, condition, callback) {
	database.connection((err, connection)=> {
		if(err) {
			callback(err, null);
			return false;
		}

		var conditionString = (utility.obj2array(condition)).join(' AND ');
		var query = connection.query(`SELECT ${fields} FROM tb_user WHERE ${conditionString} ;`, function(err, result) {
			callback(err, result);
		 	return (err);
		});
	});
};

var del = function del(user, callback)
{
	database.connection((err, connection)=>
	{
		if(err)
		{
			callback(err);
			return false;
		}
		var query = connection.query(`DELETE FROM tb_user WHERE name = '${user.name}' ;`, function(err, result)
		 	{
		 		callback(err || !result.affectedRows, result);
		 		return (err || result.affectedRows);
		 	});
	});
};

exports.add = add;
exports.del = del;
exports.edit = edit;
exports.search = search;