var conf = require('../conf/conf.js');
var assert = require('assert');
describe('test conf', function() {
  describe('mysql', function() {
    it('should return \'host\' when the property is \'mysql.host\'', function() {
      assert.equal('host', conf.mysql.host);
    });
    it('should return 3389 when the property is \'mysql.port\'', function() {
      assert.ok(3389 === conf.mysql.port);
    });
    it('should return true when the property is \'mysql.port\'', function() {
      assert.equal(['host', 'port', 'user', 'password', 'database'].join(), Object.keys(conf.mysql));
    });
  });
});