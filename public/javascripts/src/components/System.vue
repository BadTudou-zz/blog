<template>
<div id="div-manage--system" v-show="isShow">
	<ul class="nav nav-tabs" role="tablist">
  		<li class="nav-item">
    		<a class="nav-link active" href="#home" role="tab" data-toggle="tab"><i class="fa fa-sitemap" aria-hidden="true"></i>网站</a>
  		</li>
  		<li class="nav-item">
    		<a class="nav-link" href="#profile" role="tab" data-toggle="tab"><i class="fa fa-file" aria-hidden="true"></i>文章</a>
  		</li>
  		<li class="nav-item">
    		<a class="nav-link" href="#messages" role="tab" data-toggle="tab"><i class="fa fa-user" aria-hidden="true"></i>个人</a>
  		</li>
  		<li class="nav-item">
    		<a class="nav-link" href="#settings" role="tab" data-toggle="tab"><i class="fa fa-database" aria-hidden="true"></i>数据库</a>
  		</li>
	</ul>

	<!-- Tab panes -->
	<div class="tab-content">
  		<div role="tabpanel" class="tab-pane active" id="home">
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
  		<div role="tabpanel" class="tab-pane" id="profile">
			<form class="col-lg-12">
      			<fieldset class="form-group col-lg-8">
      				<small class="text-muted">保存位置</small>
        			<input type="text" class="form-control" placeholder="保存位置" >
        			<small class="text-muted">CSS文件</small>
        			<select class="form-control">
        				<option value="website">简洁风</option>
        				<option value="feature">艳丽</option>
        				<option value="article">黑白</option>
        			</select>
      			</fieldset>
    		</form>
    		<div class="col-lg-offset-6">
      			<button type="button" class="btn btn-primary">保存</button>
      		</div>
  		</div>
  		<div role="tabpanel" class="tab-pane" id="messages">
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
  		<div role="tabpanel" class="tab-pane" id="settings">
    		<button type="button" class="btn btn-primary">Primary</button>
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
      master: state=>state.conf.master
    }),
  methods:{
    setWebsiteConf:function(){
      this.$store.dispatch('setWebsiteConf', this.website);
    },
    setMasterConf:function(){
      this.$store.dispatch('setMasterConf', this.master);
    }
  }
}
</script>