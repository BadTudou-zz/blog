'use static';

var express = require('express');
var router = express.Router();
var article = require('../servers/article.js');
var utility = require('../utility/utility');
var path = require('path');

router.put('/', function(req, res) {
	var params = req.query;
	switch(params.action) 
	{
		case 'article-discuss':
			var newDiscuss = req.body.newDiscuss;
			console.log(JSON.stringify(newDiscuss));
			article.addDiscuss(newDiscuss, (err, result)=>
			{
				if(!err)
					res.end(JSON.stringify({err:false, result:true}));
				else
					res.end(JSON.stringify({err:true, result:'add disscuss to article error'}));
			});
			break; 

		case 'article-search':
			var condition = utility.obj2array(req.body.condition);
			// 此处没有break，是为了下面的代码可用复用，他们只是搜索条件不同
			
		case 'article-search-title':
			var condition = `title LIKE `+utility.escape("%"+req.body.condition+"%");
			var fields = `id, featureID, title, subtitle, link, license, 
			timeCreated, author, introduction, coverLink, countDiscuss`;
			var range = {from: Number(req.body.from), count: Number(req.body.count)};
			article.search(fields, condition, range, (err, result) =>{
				if(!err){
					res.end(JSON.stringify({err:false, result:result}));
					console.log('搜索文章成功'+JSON.stringify(result));
				}
				else{
					res.end(JSON.stringify({err:true, result:'search article error'}));
					console.log('搜索文章失败');
				}
			});
			break;

		default:
			res.end(JSON.stringify({err:true, result:'undefined action with unlogin user'}));
			break;
	}
});



// 普通用户获取信息
router.get('/', function(req, res) {
	var params = req.query;
	switch(params.action) {
		case 'article-range':
			var fields = `id, featureID, title, subtitle, link, timeCreated, 
						author, introduction, coverLink`;
			var range = {from: Number(params.from), count: Number(params.count)};
			article.list(fields, range, (err, result)=> {
				if(!err)
					res.end(JSON.stringify({err:false, result:result}));
				else
					res.end(JSON.stringify({err:true, result:'get article range error'}));
			});
			break;

		case 'article-discuss':
			var articleID = params.id;
			article.getDiscuss(articleID, (err, result)=>{
				if(!err)
					res.end(JSON.stringify({err:false, result:result}));
				else
					res.end(JSON.stringify({err:true, result:'get article disscuss error'}));
			});
			break;

		default:
			res.end(JSON.stringify({err:true, result:'undefined request action with unlogin user'}));
	}
});
module.exports = router;
