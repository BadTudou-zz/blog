var conf = require('../conf/conf.js');
var mysql = require('mysql');
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

var escape = function(query){
	return mysql.escape(query);
};

exports.query = query;
exports.escape = escape;