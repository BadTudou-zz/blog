var mysql = require('mysql');

var objectValues = function objectValues(object)
{
	var values = [];  
    for(var pro in object)
    {  
      	values.push(object[pro]);  
   	}
   	return values;
};

var obj2array = function obj2array(object) {
	var values = [];
	for(var pro in object)
	{
		values.push(pro+' = '+mysql.escape(object[pro]));
	}
	return values;
};

exports.objectValues = objectValues;
exports.obj2array = obj2array;