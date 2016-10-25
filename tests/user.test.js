var assert = require('assert');
var user = require('../servers/user.js');
var newUser = {
	name:'test',
	nickname:'杜小豆',
	password:'admin',
	question:'who are you?',
	anser:'i am badtudou',
	authority:'website'
};

describe('test user', function() {
	describe('#add', function()
	{
		it('should return true when add user is ok', function(done){
			user.add(newUser,(err, result)=>
				{
					if (!err)
						done();
					else
						done(err);
				});
		});
	});

	describe('#edit', function()
	{
		it('should return true when edit user is ok', function(done){
			var userEdit = {name:'test', nickname:'新昵称'};	// 手动指定要更新的用户名
			user.edit(userEdit, (err, result)=> {
					if (!err)
						done();
					else
						done(err);
				});
		});

		it('should return true when edit user is error', function(done){
			var userEdit = {name:'test1', nickname:'新昵称'};	// 手动指定要更新的用户名
			user.edit(userEdit, (err, result)=> {
					if (!err)
						done(err);
					else
						done();
				});
		});
	});

	describe('#del', function()
	{
		it('should return true when del user is ok', function(done){
			var condition = `name = 'test' AND nickname = '新昵称'`;	// 手动指定要更新的用户名
			user.del(condition,(err, result)=>
				{
					if (!err)
						done();
					else
						done(err);
				});
		});

		it('should return true when del user is error', function(done){
			var condition = `name = 'test99' AND nickname = '新昵称'`	// 手动指定要更新的用户名
			user.del(condition,(err, result)=>
				{
					if (!err)
						done(err);
					else
						done();
				});
		});
	});

	describe('#search', function() {
		it('should return true when search user is ok', function(done) {
			var fields = 'name, nickname';
			var condition = `nickname = '杜小豆'`;
			var range = {from:0, count:1};
			user.search(fields, condition, range, (err, result)=> {
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

		it('should return true when search user is error', function(done) {
			var fields = 'name, nickname';
			var condition = '';
			var range = {from:0, count:1};
			user.search(fields, condition, range, (err, result)=> {
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
});