var conf = require('../conf/conf.js');
var mysql = require('mysql');
var utility = require('../utility/utility');
var pool  = mysql.createPool(conf.mysql);

var query = function query(sql, callback){
	pool.getConnection(function(err, connection)
	{
		if(!err){
			connection.query(sql,function(err,result){  
                connection.release();  
                callback(err, result);
            });
		}
		else{
			callback(err, null);
		}
		return !err;
	});
};

/**
 * [遍历]
 * @param  {[String]}   table    [表名]
 * @param  {[String]}   fields   [字段列表]
 * @param  {[Object]}   range    [范围]
 * @param  {Function}	callback [回调函数]
 */
var list = function list(table, fields, range, callback) {
	var sqlString;
	if(!range)
		sqlString = `SELECT ${fields} FROM ${table}`;
	else
		sqlString = `SELECT ${fields} FROM ${table} LIMIT ${range.from},${range.count};`;
	
	query(sqlString, function(err, result) {
		callback(err, result);
	});
};

/**
 * [搜索]
 * @param  {[String]}   table     [表名]
 * @param  {[String]}   fields    [字段列表]
 * @param  {[String]}   condition [条件]
 * @param  {Function}   callback  [回调函数]
 */
var search = function search(table, fields, condition, range, callback) {
	var sqlString = `SELECT ${fields} FROM ${table} WHERE ${condition} LIMIT ${range.from},${range.count};`;
	query(sqlString, function(err, result) {
		callback(err, result);
	});
};

/**
 * [删除]
 * @param  {[String]}   table     [表名]
 * @param  {[String]}   condition [条件]
 * @param  {Function} 	callback  [回调函数]
 */
var del = function del(table, condition, callback) {
	var sqlString = `DELETE FROM ${table} WHERE ${condition} ;`;
	query(sqlString, function(err, result) {
	 		callback(err || !result.affectedRows, result);
	 	});
};

/**
 * [编辑]
 * @param  {[String]}   table    [表名]
 * @param  {[object]}   article  [含有所有字段属性的对象]
 * @param  {Function} 	callback [回调函数]
 * @return {[Object/boolean]}  	 [有错误:Object;无错误;false]
 */
var update = function update(table, values, condition, callback) {
	var valuesString = utility.obj2array(values).join(' , ');
	var sqlString = `UPDATE ${table} SET ${valuesString} WHERE ${condition} ;`;
	query(sqlString, (err, result)=> {
		callback(err || !result.affectedRows, result);
	});
};


exports.query = query;
exports.list = list;
exports.search = search;
exports.del = del;
exports.update = update;