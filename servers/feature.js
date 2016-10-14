var conf = require('../conf/conf.js');
var utility = require('../utility/utility.js');
var database = require('../servers/database.js');


var add = function add(feature, callback)
{
	database.connection((err, connection)=>
	{
		if(err) {
			callback(err);
			return false;
		}
		//专题字段: id, title, timeCreate, author, introduction
		var values = connection.escape(utility.objectValues(feature));

		connection.query(`INSERT INTO tb_feature (title, author, introduction)
			VALUES('${feature.title}', '${feature.author}', '${feature.introduction}')`, function(err, result) {
				callback(err || !result.affectedRows, result);
				return  (err || result.affectedRows);
			});
	});
};

var del = function del(feature, callback) {
	database.connection((err, connection)=> {
		if(err) {
			callback(err);
			return false;
		}

		connection.query(`DELETE FROM tb_feature WHERE ? ;`, feature, function(err, result) {
		 		callback(err || !result.affectedRows, result);
		 		return (err || result.affectedRows);
		 	});
	});
};

var edit = function edit(feature, callback) {
	database.connection((err, connection)=> {
		if(err) {
			callback(err, null);
			return false;
		}
		var values = connection.escape(utility.objectValues(feature));

		connection.query(`UPDATE tb_feature SET ? WHERE id = ${feature.id} ;`, feature, function(err, result) {
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
			sql = `SELECT ${fields} FROM tb_feature`;
		else
			sql = `SELECT ${fields} FROM tb_feature LIMIT ${range.from},${range.to};`
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

		var conditionString = (utility.obj2array(condition)).join(' AND ');
		connection.query(`SELECT ${fields} FROM tb_feature WHERE ${conditionString} ;`, function(err, result) {
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
