var mysql = require('mysql');
var fs = require('fs');
var archiver = require('archiver');


/**
 * [获取对象的所有值]
 * @param  {[type]} object [description]
 * @return {[Array]}       [对象值数组]
 * 
 *  objectValues({a:12, b:'"123"'})
 *  [12, "\"123\""]
 */
var objectValues = function objectValues(object)
{
	var values = [];  
    for(var pro in object)
    {  
      	values.push(mysql.escape(object[pro]));  
   	}
   	return values;
};

/**
 * [对象转数组]
 * @param  {[object]} object [对象]
 * @return {[Array]}         [字符串数组]
 *
 *  obj2array({a:1, b:'"123"'})
 *  ["a = 1", " b = \"123\""]
 */
var obj2array = function obj2array(object) {
	var values = [];
	for(var pro in object)
	{
		values.push(pro+' = '+mysql.escape(object[pro]));
	}
	return values;
};

/**
 * [对象转义]
 * @param  {[object]} object [对象]
 * @return {[object]}        [对象]
 *
 *  objescape({a:1, b:'"12"'})
 *  {a:1, b:'\"12\"'}
 */
var objescape = function objescape(object){
	for(var pro in object){
		object[pro] = mysql.escape(object[pro]);
	}
	return object;
};

/**
 * [转义]
 * @param  {[value]} value [变量]
 * @return {[value]}       [description]
 *
 *  esacpe({a:1, b:2})
 *  a = 1, b = 2
 *
 *  escape('abc')
 *  '\"abc\"'
 */
var escape = function escape(value)
{
	return mysql.escape(value);
};

var compress = function compress(glob, outFile)
{
	var output = fs.createWriteStream(outFile);
	var archive = archiver('zip', {
    	store: true // Sets the compression method to STORE.
	});
	archive.pipe(output);
	archive.glob(glob);
	archive.finalize();
};

exports.objectValues = objectValues;
exports.obj2array = obj2array;
exports.objescape = objescape;
exports.escape = escape;
exports.compress = compress;