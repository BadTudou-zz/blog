var assert = require('assert');
var discuss = require('../servers/discuss');
var newDiscuss = {
	author:'wo', 
	contact:'ba@qq.com', 
	discussID:'1', 
	content:'评论内容', 
	state:'verify', 
	mask:'comman', 
	type:'disc'
};

describe('test discuss', function() {
	var insertId = 0;

	describe('#add', function()
	{
		it('should return true when add discuss is ok', function(done){
			discuss.add(newDiscuss,(err, result)=>
				{
					if (!err)
						done();
					else
						done(err);

					insertId = result.insertId;
				});
		});
	});

	describe('#search', function()
	{
		it('should return true when search discuss is ok', function(done){
			var articleID = 147;
			var fields = 'id, author, discussID, timeCreate, content';
			discuss.search(fields, {from:0, to:5}, {discussID:articleID, state:'pass', type:'disc'}, (err, result)=>{
				if (!err){
					console.log(JSON.stringify(result));
					done();
				}
				else
					done(err);
			});
		});
	});

	describe('#edit', function()
	{
		it('should return true when edit discuss is ok', function(done){
			var newDiscuss = {
				id:3,
				state:'pass'
			};
			discuss.edit(newDiscuss, (err, result)=>{
				if (!err){
					console.log('成功'+JSON.stringify(result));
					done();
				}
				else
					done(true);
			});
		});

		it('should return true when edit discuss is error', function(done){
			var newDiscuss = {
				id:147,
				state:'pass'
			};
			discuss.edit(newDiscuss, (err, result)=>{
				if (!err){
					done(err);
				}
				else
					done();
			});
		});
	});
});