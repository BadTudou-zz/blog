const article = require('../servers/article.js');
var newArticle = {
	featureID:1, 
	title:'文章标题', 
	subtitle:'文章副标题', 
	author:'作者', 
	link:'文章链接', 
	license:'协议', 
	timeRelease:'20120901',
	introduction:'介绍',
	coverLink:'封面图片链接',
	content:'内容',
	labels:'标签'
};

var assert = require('assert');

describe('test article', function() {
	describe('#add', function()
	{
		it('should return true when add article is ok', function(done){
			article.add(newArticle,(err)=>
				{
					if (!err)
						done();
					else
						done(err);
				});
		});

		it('should return error when add article propery is error', function(done){
			newArticle.featureID = -1234;
			article.add(newArticle,(err)=>
				{
					if (!err)
						done(err);
					else
						done();
				});
		});
	});
});