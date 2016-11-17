CREATE DATABASE  IF NOT EXISTS db_blog DEFAULT CHARACTER SET utf8

//文章 （文章ID，所属专题，标题，副标题，链接，协议，创建日期，发布日期，修改日期，作者，简介，封面图片，内容，阅读量，分享量，评论量，标签）

CREATE TABLE tb_article 
(
	id INTEGER UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
	featureID INTEGER UNSIGNED NOT NULL,
	title VARCHAR(128) NOT NULL,
	subtitle VARCHAR(128),
	link VARCHAR(256) NOT NULL,
	license VARCHAR(256),
	timeCreated TIMESTAMP NOT NULL 	DEFAULT CURRENT_TIMESTAMP,
	timeRelease TIMESTAMP NOT NULL,
	timeModify TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	author VARCHAR(256) NOT NULL,
	introduction VARCHAR(256),
	coverLink VARCHAR(256),
	content TEXT NOT NULL,
	countRead INTEGER UNSIGNED NOT NULL DEFAULT 0,
	countShare INTEGER UNSIGNED NOT NULL DEFAULT 0,
	countDiscuss INTEGER UNSIGNED NOT NULL DEFAULT 0,
	labels VARCHAR(256),
	state VARCHAR(16) NOT NULL DEFAULT  'pass'
	/*
		state 'verify':审核, 'pass':通过, 'unpass':未通过, 'draft':草稿
	*/

)

	ALTER TABLE tb_article ADD CONSTRAINT fk_article_featuresID 
	FOREIGN KEY (featureID) REFERENCES tb_feature(id)
	ON UPDATE CASCADE ON DELETE CASCADE

	CREATE TRIGGER tb_article_insert
	AFTER INSERT ON tb_article 
	FOR EACH ROW 
	UPDATE tb_feature SET countArticle = countArticle+1 WHERE id = NEW.featureID;


	CREATE TRIGGER tb_article_delete
	AFTER DELETE ON tb_article 
	FOR EACH ROW 
	UPDATE tb_feature SET countArticle = countArticle-1 WHERE id = OLD.featureID;

	/*
	DROP TRIGGER tb_article_delete;
	*/

//专题 （专题ID，标题，创建日期，作者，简介）
CREATE TABLE tb_feature
(
	id INTEGER UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
	title VARCHAR(20) NOT NULL,
	timeCreate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	author VARCHAR(256) NOT NULL,
	introduction VARCHAR(256),
	countArticle INTEGER UNSIGNED DEFAULT NOT NULL 0
)
	ALTER TABLE tb_feature ADD CONSTRAINT fk_author 
	FOREIGN KEY author REFERENCES tb_admin(name)
	ON UPDATE CASCADE ON DELETE CASCADE

//评论 （评论ID，评论者，联系方式，评论文章，评论日期，评论内容，评论标记, 标记, 类型）
CREATE TABLE tb_discuss
(
	id INTEGER UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
	author VARCHAR(32) NOT NULL,
	contact VARCHAR(64),
	discussID INTEGER UNSIGNED NOT NULL,
	timeCreate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	content VARCHAR(256) NOT NULL,
	state VARCHAR(16) NOT NULL DEFAULT  'verify',
	mask VARCHAR(16) NOT NULL DEFAULT 'comman',
	type VARCHAR(16) NOT NULL DEFAULT 'disc'
)
/*
	state 'verify':审核, 'pass':通过, 'unpass':未通过
	mask  'groom':推荐, 'dust':垃圾, 'comman':普通
	type  'disc':评论, 'disc_res':回复评论, 'message':留言, 'message_res':回复留言
 */

//
CREATE TABLE tb_user
(
	name VARCHAR(128) NOT NULL PRIMARY KEY,
	nickname VARCHAR(128) NOT NULL,
	password VARCHAR(512) NOT NULL,
	question VARCHAR(128) NOT NULL,
	anser VARCHAR(128) NOT NULL,
	authority VARCHAR(16) NOT NULL DEFAULT 'website',
	timeCreate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	state VARCHAR(16) NOT NULL DEFAULT 'pass'
)
/*
	authority 'feature':专题, 'article':文章, 'website':全站,
	state 'verify':审核, 'pass':通过,可以使用, 'unpass':未通过，被禁用
 */

CREATE TABLE tb_visitor
(
	id INTEGER UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
	token VARCHAR(128) NOT NULL,
	timeVisited TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	ua  VARCHAR(256)
)

//系统:截止 2016/10/11 暂未创建
CREATE TABLE tb_log
(
	id INTEGER UNSIGNET AUTO_INCREMENT NOT NULL PRIMARY KEY,
	ipAddress VARCHAR(32) NOT NULL,
	timeVisted TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	//urlsVisted 
)