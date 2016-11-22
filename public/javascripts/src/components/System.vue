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
        			<input type="text" class="form-control" placeholder="网站标题" v-model="system.name">
        			<small class="text-muted">域名</small>
        			<input type="text" class="form-control" placeholder="域名" v-model="system.domain">
        			<small class="text-muted">ICP备案号</small>
        			<input type="text" class="form-control" placeholder="ICP备案号" v-model="system.icp">
      			</fieldset>
    		</form>
    		<div class="col-lg-offset-6">
      			<button type="button" class="btn btn-primary">保存</button>
      		</div>
    	</div>
  		<div role="tabpanel" class="tab-pane" id="profile">
			<form class="col-lg-12">
      			<fieldset class="form-group col-lg-8">
      				<small class="text-muted">保存位置</small>
        			<input type="text" class="form-control" placeholder="保存位置" v-model="system.icp">
        			<small class="text-muted">CSS文件</small>
        			<select class="form-control"  v-model="system.css">
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
        			<input type="text" class="form-control" placeholder="昵称" v-model="system.nickname">
        			<small class="text-muted">简介</small>
        			<input type="text" class="form-control" placeholder="简介" v-model="system.j">
        			<small class="text-muted">个人说明</small>
        			<input type="text" class="form-control" placeholder="个人说明" v-model="system.j">
      			</fieldset>
      		</form>
      		<div class="col-lg-offset-6">
      			<button type="button" class="btn btn-primary">保存</button>
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
	data () {
    	return { system:''}
  },
  computed: mapState({
      isShow: state=> (state.parentNavItem.text == '管理') && (state.manageParentNavItem.text == '系统')
    })
}
</script>