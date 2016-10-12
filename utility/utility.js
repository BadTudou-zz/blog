var objectValues = function objectValues(object)
{
	var values = [];  
    for(var pro in object)
    {  
      	values.push(object[pro]);  
   	}
   	return values;
};

exports.objectValues = objectValues;