var utility = require('../utility/utility.js');
var assert = require('assert');

describe('test utility', function() {
	describe('test # objectValues', function(){
		it('should return true when the objectValues is ok', function() {
			var obj = {id:12, name:'test'};
			assert.ok(utility.objectValues(obj) == [12, 'test'].toString());
		});

		it('should return true when the objectValues is error', function() {
			var obj = {id:12, name:'test1'};
			assert.ok(utility.objectValues(obj) != [12, 'test'].toString());
		});
	});

	describe('test # obj2array', function(){
		it('should return true when the obj2array is ok', function() {
			var obj = {id:1, name:'test'};
			assert.ok(utility.obj2array(obj) == ['id = 1', 'name = "test"'].toString());
		});
	});
	
});