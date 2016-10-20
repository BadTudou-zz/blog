var conf = {
	mysql:{
		host	: 'host',
		//port	:  3389,
		user	: 'user',
		password: 'password',
		database: 'database'
	},
	system:{
		articleStorePath: '/public/html/article/',
		articleTemplatePath: '/public/template/article.pug',
		articleCssName: 'article.css'
	}
};

module.exports = conf;