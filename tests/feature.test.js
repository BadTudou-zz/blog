var assert = require('assert');

var feature = require('../servers/feature.js');
var newFeature = {
	title:'专题', 
	author:'作者', 
	introduction:'介绍',
};


describe('test feature', function() {
	describe('#add', function()
	{
		it('should return true when add feature is ok', function(done){
			feature.add(newFeature,(err)=>
				{
					if (!err)
						done();
					else
						done(err);
				});
		});
	});
});
