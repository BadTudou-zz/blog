var conf = require('../conf/conf.js');
var mysql = require('mysql');
var pool;

var create = function create(callback)
{
	pool  = mysql.createPool(conf.mysql);
	callback(pool);
};

var  connection = function connection(callback)
{
	create((pool)=>
	{
		pool.getConnection(function(err, connection)
		{
			callback(err, connection);
			if(err)
			{
				return false;
			}
			else
			{
				return true;
			}
		});
	});
};

exports.connection = connection;