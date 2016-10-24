var pug = require('pug');
var path = require('path');
var assert = require('assert');

describe('test pug', function() {
	describe('#renderFile', function(){
		var content = '<p>12312</p>';
		var renderOption = {pretty: '\t'};
		it('should return true when  the  template file is ok', function(done) {
			try
			{
				var html = pug.renderFile(path.dirname(__dirname)+'/public/template/article.pug',{content:content}, renderOption);
				console.log(html);
				done();
			}
			catch(e)
			{
				done(e);
			}
		});
	});
});
