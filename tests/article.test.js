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

		it('should return true when add article  is error', function(done){
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

	describe('#edit', function()
	{
		it('should return true when edit article is ok', function(done){
			var articleEdit = {id:insertId, title:'新文章名'};	// 此处要更新内容的ID是#add 添加的记录，手动指定请启用下面的语句
			//var featureDel = {id:60, title:'新文章名'};	// 手动指定要更新的ID
			article.edit(articleEdit, (err, result)=> {
					if (!err)
						done();
					else
						done(err);
				});
		});

		it('should return true when edit article is error', function(done){
			var articleEdit = {id:insertId+1, title:'新文章名'};	// 此处要更新内容的ID是#add 添加的记录+1，手动指定请启用下面的语句
			//var featureDel = {id:-1234567, title:'新文章名'};	// 手动指定要更新的ID
			article.edit(articleEdit, (err, result)=> {
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

	describe('#search', function() {
		it('should return true when search article is ok', function(done) {
			var fields = 'id, title';
			var condition = {author:'作者', id:124};
			article.search(fields, condition, (err, result)=> {
				if (!err)
				{
					done();
					console.log(JSON.stringify(result));
				}
				else
				{
					done(err);
				}
			});
		});

		it('should return true when search article is error', function(done) {
			var fields = 'id, title';
			var condition = {};
			article.search(fields, condition, (err, result)=> {
				if (!err)
				{
					done(err);
				}
				else
				{
					done();
				}
			});
		});
	});

	describe('#list', function() {
		it('should return true when list article range is ok', function(done) {
			var fields = 'id, title';
			var range = {from:0, to:1};
			article.list(fields, range, (err, result)=> {
				if (!err)
				{
					done();
					console.log(JSON.stringify(result));
				}
				else
				{
					done(err);
				}
			});
		});

		it('should return true when list article range is error', function(done) {
			var fields = 'id, title';
			var range = {from:0, to:-1};
			article.list(fields, range, (err, result)=> {
				if (!err)
				{
					done(err);
				}
				else
				{
					done();
				}
			});
		});

		it('should return true when list article range is null', function(done) {
			var fields = 'id, title';
			article.list(fields, null, (err, result)=> {
				if (!err)
				{
					done();
					console.log(JSON.stringify(result));

				}
				else
				{
					done(err);
				}
			});
		});
	});
});