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
		var tag ='';
		switch(typeof(object[pro]))
		{
			case 'number':
				break;
			case 'string':
				tag = '"';
				break;
		}
		values.push(pro+' = '+tag+object[pro]+tag);
	}
	return values;
};

exports.objectValues = objectValues;
exports.obj2array = obj2array;