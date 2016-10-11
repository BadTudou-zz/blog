var conf = require('../conf/conf.js');
var mysql = require('mysql');
//featureID, title, subtitle, link, license, timeCreated, timeRelease, timeModify, author, introduction, coverLink, content, countRead, countShare, countDiscuss, labels
var add = function add(article, callback)
{
	var pool  = mysql.createPool(conf.mysql);		
	pool.getConnection(function(err, connection)
	{
		if(err)
		{
			callback(err);
			return false;
		}
		/*
		console.log(`INSERT INTO tb_article (featureID, title, subtitle, author, link, license, 
			timeRelease, introduction, coverLink, content, labels)
			VALUES(${article.featureID}, '${article.title}', '${article.subtitle}', '${article.author}',
			'${article.link}', '${article.license}', '${article.timeRelease}', '${article.introduction}',
			'${article.coverLink}', '${article.content}', '${article.labels}');`);
		*/
	
			connection.query(`INSERT INTO tb_article (featureID, title, subtitle, author, link, license, 
			timeRelease, introduction, coverLink, content, labels) 
			VALUES(${article.featureID}, '${article.title}', '${article.subtitle}', '${article.author}',
			'${article.link}', '${article.license}', '${article.timeRelease}', '${article.introduction}',
			'${article.coverLink}', '${article.content}', '${article.labels}');`, function(err, result)
		 	{
		 		callback(err);
		 		return !err;
		 	});

	});
};

exports.add = add;
