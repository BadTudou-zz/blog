var conf = require('../conf/conf.js');
var mysql = require('mysql');

var add = function add(feature, callback)
{
	var pool  = mysql.createPool(conf.mysql);		
	pool.getConnection(function(err, connection)
	{
		if(err)
		{
			callback(err);
			return false;
		}

		connection.query(`INSERT INTO tb_feature (title, author, introduction)
			VALUES('${feature.title}', '${feature.author}', '${feature.introduction}')`, function(err)
			{
				callback(err);
				return !err;
			});
	});
};

exports.add = add;
