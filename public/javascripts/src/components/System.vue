<template>
<div id="div-manage--system" v-show="isShow">
	<ul class="nav nav-tabs" role="tablist">
  		<li class="nav-item">
    		<a class="nav-link active" href="#website" role="tab" data-toggle="tab"><i class="fa fa-sitemap" aria-hidden="true"></i>网站</a>
  		</li>
  		<li class="nav-item">
    		<a class="nav-link" href="#article" role="tab" data-toggle="tab" @click="getArticleConf"><i class="fa fa-file" aria-hidden="true"></i>文章</a>
  		</li>
  		<li class="nav-item">
    		<a class="nav-link" href="#master" role="tab" data-toggle="tab"><i class="fa fa-user" aria-hidden="true"></i>个人</a>
  		</li>
  		<li class="nav-item">
    		<a class="nav-link" href="#database" role="tab" data-toggle="tab" @click="getDatabaseConf"><i class="fa fa-database" aria-hidden="true"></i>数据库</a>
  		</li>
	</ul>

	<!-- Tab panes -->
	<div class="tab-content">
  		<div role="tabpanel" class="tab-pane active" id="website">
			<form class="col-lg-12">
      			<fieldset class="form-group col-lg-8">
        			<small class="text-muted">网站标题</small>
        			<input type="text" class="form-control" placeholder="网站标题" v-model="website.title">
        			<small class="text-muted">域名</small>
        			<input type="text" class="form-control" placeholder="域名" v-model="website.domain">
        			<small class="text-muted">ICP备案号</small>
        			<input type="text" class="form-control" placeholder="ICP备案号" v-model="website.ICP">
      			</fieldset>
    		</form>
    		<div class="col-lg-offset-6">
      			<button type="button" class="btn btn-primary" @click="setWebsiteConf">保存</button>
      		</div>
    	</div>
  		<div role="tabpanel" class="tab-pane" id="article">
			<form class="col-lg-12">
      			<fieldset class="form-group col-lg-8">
      				<small class="text-muted">保存位置</small>
        			<input type="text" class="form-control" placeholder="保存位置" v-model="article.storePath">
        			<small class="text-muted">CSS文件</small>
        			<select class="form-control" v-model="article.css">
        				<option v-for="articleCssItem in articleCssList" :value="articleCssItem.file">{{articleCssItem.name}}</option>
        			</select>
      			</fieldset>
    		</form>
    		<div class="col-lg-offset-6">
      			<button type="button" class="btn btn-primary" @click="setArticleConf">保存</button>
      		</div>
  		</div>
  		<div role="tabpanel" class="tab-pane" id="master">
    		<form class="col-lg-12">
      			<fieldset class="form-group col-lg-8">
        			<small class="text-muted">昵称</small>
        			<input type="text" class="form-control" placeholder="昵称" v-model="master.nickname">
        			<small class="text-muted">简介</small>
        			<input type="text" class="form-control" placeholder="简介" v-model="master.summary">
        			<small class="text-muted">个人说明</small>
        			<input type="text" class="form-control" placeholder="个人说明第1段" v-model="master.instructionPartOne">
              <input type="text" class="form-control" placeholder="个人说明第2段" v-model="master.instructionPartTwo">
              <small class="text-muted">社交网站</small>
              <div class="input-group" style="margin-top: 0px">
                <span class="input-group-addon"><i class="fa fa-1x fa-weibo"aria-hidden="true"></i></span>
                <input type="text" class="form-control" placeholder="微博" v-model="master.weibo">

                <span class="input-group-addon"><i class="fa fa-1x fa-github"aria-hidden="true"></i></span>
                <input type="text" class="form-control col-lg-12" placeholder="GitHub" v-model="master.github">
              
                <span class="input-group-addon"><i class="fa fa-1x fa-rocket"aria-hidden="true"></i></span>
                <input type="text" class="form-control" placeholder="知乎" v-model="master.zhihu">
              </div>
      			</fieldset>
      		</form>
      		<div class="col-lg-offset-6">
      			<button type="button" class="btn btn-primary" @click="setMasterConf">保存</button>
      		</div>
  		</div>
  		<div role="tabpanel" class="tab-pane" id="database">
        <form class="col-lg-12">
          <fieldset class="form-group col-lg-8">
            <small class="text-muted">备份位置</small>
            <input type="text" class="form-control" placeholder="备份位置" v-model="database.storePath">
            <small class="text-muted">自动备份</small>
            <div>
              <label class="switch-light switch-ios " style="width: 100px">
              <input id="ck-autoSave" type="checkbox"  v-model="database.autoBackup">
              <span>
                <span>关闭</span>
                <span>开启</span>
                <a>&nbsp;</a>
              </span>
              </label>
            </div>
          </fieldset>
          <fieldset class="form-group col-lg-6" style="margin-top:-15px;">
            <small class="text-muted">备份频率</small>
            <div class="input-group" style="margin-top:0px;">
              <input type="text" class="form-control" :disabled="!database.autoBackup" placeholder="备份频率" v-model="database.interval">
              <span class="input-group-addon">分钟</span>
            </div>
          </fieldset>
          <fieldset class="col-lg-6">
            <div style="margin-top:10px;">
              <button type="button" class="btn btn-primary" @click="addBackup">立即备份</button>
            </div>
          </fieldset>
        </form>
        <div class="col-lg-9">
          <ul class="list-group">
            <li class="list-group-item" style="height: 40px;" v-for="backupDatabaseItem in backupDatabaseList">
              <div class="col-lg-7">{{backupDatabaseItem}}</div>
              <div class="col-lg-2 col-lg-offset-1"><button type="button" class="btn btn-primary btn-sm" @click="backupDatabase">下载</button></div>
              <div class="col-lg-2"><button type="button" class="btn btn-primary btn-sm" @click="delBackup(backupDatabaseItem)">删除</button></div>
            </li>
          </ul>
        </div>
        <div class="col-lg-6">
           共{{backupDatabaseList.length}}个备份
        </div>
        <div class="col-lg-6 col-lg-offset-6">
            <button type="button" class="btn btn-primary"  @click="setDatabaseConf">保存</button>
        </div>
  		</div>
	</div>
</div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  computed: mapState({
      isShow: state=> (state.parentNavItem.text == '管理') && (state.manageParentNavItem.text == '系统'),
      website: state=>state.conf.website,
      article: state=>state.conf.article,
      master: state=>state.conf.master,
      database: state=>state.conf.database,
      articleCssList: state=>state.conf.articleCssList,
      backupDatabaseList: state=>state.backupDatabaseList
    }),
  methods:{
    getArticleConf:function(){
      console.log('获取文章配置信息');
      this.$store.dispatch('getArticleCssList');
      this.$store.dispatch('getArticleConf');
    },
    getDatabaseConf:function(){
      this.$store.dispatch('getDatabaseConf');
      this.$store.dispatch('getBackupDatabaseList');
    },
    addBackup:function(){
      this.$store.dispatch('addBackup');
      this.$store.dispatch('getBackupDatabaseList');
    },
    setWebsiteConf:function(){
      this.$store.dispatch('setWebsiteConf', this.website);
    },
    setMasterConf:function(){
      this.$store.dispatch('setMasterConf', this.master);
    },
    setArticleConf:function(){
      this.$store.dispatch('setArticleConf', this.article);
    },
    setDatabaseConf:function(){
      console.log(JSON.stringify(this.database));
    },
    delBackup:function(file){
      this.$store.dispatch('delBackup', file);
      this.$store.dispatch('getBackupDatabaseList');
    }
  }
}
</script>