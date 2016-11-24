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
	},
	website:{
		title:"杜小豆的编程大道",
		domain:"BadTudou",
		ICP:"渝ICP备16010823号"
	},
	master:{
		nickname:"杜小豆",
		summary:"IT男,程序猿,技术型工作者.",
		instructionPartOne:" 一个农民的后代,不了解乡土,也不懂得城市.",
		instructionPartTwo:"我有一个脑袋,装载思想、未来与梦想.",
		weibo:"http://weibo.com/badtudou",
		github:"https://github.com/BadTudou",
		zhihu:"https://zhuanlan.zhihu.com/DuXiaoDou"
	}
};

module.exports = conf;