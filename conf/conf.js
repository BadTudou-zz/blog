var conf = {
	mysql:{
			host	: 'host',
 			// 	port	:  3389,
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
	article:{
		storePath: '/public/html/article',
		templatePath: '/public/template/article.pug',
		css: '2.css'
	},
	website:{
		title:"杜小豆的编程小道",
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
	},
	database:{
		storePath: '/usr/share/nginx/blog/backup',
		autoBackup:false,
		interval: 60
	},
	articleCssList:[
		{name:'简约',file:'1.css'},
		{name:'艳丽',file:'2.css'},
		{name:'默认',file:'3.css'}
	]
};

module.exports = conf;