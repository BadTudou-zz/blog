var assert = require('assert');
var databse = require('../servers/database.js');

describe('test databse', function() {
	it('should return true when the databse connection is ok', function(done) {
		databse.connection((err, connection)=>
		{
			if(!err)
				done();
			else
				done(err);
		});
	});

});