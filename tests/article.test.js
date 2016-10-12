var assert = require('assert');
var article = require('../servers/article.js');
var newArticle = {
	featureID:8, 
	title:'文章标题', 
	subtitle:'文章副标题', 
	author:'作者', 
	link:'文章链接', 
	license:'协议', 
	timeRelease: '20120901',
	introduction:'介绍',
	coverLink:'";封面图片链接"',
	content:'内容',
	labels:'标签'
};



describe('test article', function() {
	var insertId = 0;

	describe('#add', function()
	{
		it('should return true when add article is ok', function(done){
			article.add(newArticle,(err, result)=>
				{
					if (!err)
						done();
					else
						done(err);

					insertId = result.insertId;
				});
		});

		it('should return true when add article propery is error', function(done){
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

	describe('#del', function()
	{
		it('should return true when del article is ok', function(done){
			var articleDel = {id:insertId}; // 此处要删除的ID是#add 添加的记录，手动指定请启用下面的语句
			//var articleDel = {id: 60}; // 手动指定要删除的ID
			article.del(articleDel,(err, result)=>
				{
					if (!err)
						done();
					else
						done(err);
				});
		});

		it('should return true when del article is error', function(done){
			var articleDel = {id:insertId+1}; // 此处要删除的ID是#add 添加的记录+1，手动指定请启用下面的语句
			//var articleDel = {id: -1234567}; // 手动指定要删除的ID
			article.del(articleDel,(err, result)=>
				{
					if (!err)
						done(err);
					else
						done();
				});
		});
	});
});