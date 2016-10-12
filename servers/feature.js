var conf = require('../conf/conf.js');
var utility = require('../utility/utility.js');
var database = require('../servers/database.js');


var add = function add(feature, callback)
{
	database.connection((err, connection)=>
	{
		if(err)
		{
			callback(err);
			return false;
		}
		//专题字段: id, title, timeCreate, author, introduction
		var values = connection.escape(utility.objectValues(feature));

		connection.query(`INSERT INTO tb_feature (title, author, introduction)
			VALUES('${feature.title}', '${feature.author}', '${feature.introduction}')`, function(err, result)
			{
				callback(err || !result.affectedRows, result);
				return  (err || result.affectedRows);
			});
	});
};

var del = function del(feature, callback)
{
	database.connection((err, connection)=>
	{
		if(err)
		{
			callback(err);
			return false;
		}

		connection.query('DELETE FROM tb_feature WHERE ? ;', feature, function(err, result)
		 	{
		 		callback(err || !result.affectedRows, result);
		 		return (err || result.affectedRows);
		 	});
	});
};

exports.add = add;
exports.del = del;
