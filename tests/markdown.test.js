var markdown = require('markdown').markdown;
var fs = require('fs');
var assert = require('assert');

describe('test markdown', function() {
  describe('#toHTML()', function(){
    it('should return true when render the markdown strong  tag is ok', function() {
      assert.ok(markdown.toHTML('**test**') === '<p><strong>test</strong></p>');
    });

    it('should return true when render the markdown strong  tag is error', function() {
      assert.ok(markdown.toHTML('**test**') !== '<strongtest</strong>');
    });

  });
});