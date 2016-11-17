var conf = {
	mysql:{
			host	: 'host',
 			//port	:  3389,
			user	: 'user',
			password: 'password',
			database: 'database',
			tables: {
				TABLE_ARTICLE:'tb_article',
				TABLE_FEATURE:'tb_feature',
				TABLE_USER:'tb_user',
				TABLE_DISCUSS:'tb_discuss',
				TABLE_VISITOR:'tb_visitor'
			}
	},
	system:{
		articleStorePath: '/public/html/article/',
		articleTemplatePath: '/public/template/article.pug',
		articleCssName: 'article.css'
	}
};

module.exports = conf;