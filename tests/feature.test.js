var assert = require('assert');

var feature = require('../servers/feature.js');
var newFeature = {
	title:'专题', 
	author:'作者', 
	introduction:'介绍',
};


describe('test feature', function() {
	var insertId = 0;

	describe('#add', function()
	{
		it('should return true when add feature is ok', function(done){
			feature.add(newFeature,(err, result)=>
				{
					if (!err)
						done();
					else
						done(err);

					insertId = result.insertId;
				});
		});
	});

	describe('#del', function()
	{
		it('should return true when add feature is ok', function(done){
			var featureDel = {id:insertId};	// 此处要删除的ID是#add 添加的记录，手动指定请启用下面的语句
			//var featureDel = {id:60};	// 手动指定要删除的ID
			feature.del(featureDel,(err, result)=>
				{
					if (!err)
						done();
					else
						done(err);
				});
		});

		it('should return true when add feature is error', function(done){
			var featureDel = {id:insertId+1};// 此处要删除的ID是#add 添加的记录+1，手动指定请启用下面的语句
			//var featureDel = {id:-1234567};	// 手动指定要删除的ID
			feature.del(featureDel,(err, result)=>
				{
					if (!err)
						done(err);
					else
						done();
				});
		});
	});
});
