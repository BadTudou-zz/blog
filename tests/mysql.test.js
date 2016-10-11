var conf = require('../conf/conf.js');
var mysql = require('mysql');
var assert = require('assert');

describe('test mysql', function() {
	it('should return true when the propery of mysql server is ok', function(done) {
   		var pool  = mysql.createPool(conf.mysql);		
		pool.getConnection(function(err, connection) {	
			if(!err)
				done();
			else
				done(err);
		});
	});

	it('should return false when propery of mysql server is error', function(done) {
		conf.mysql.host = '1244';
   		var pool  = mysql.createPool(conf.mysql);		
		pool.getConnection(function(err, connection) {	
			if(!err)
				done(err);
			else
				done();
		});
	});
});