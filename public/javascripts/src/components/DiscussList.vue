<template>
<div  id="div-manage--discusslist" v-show="isShow">
  <div id="div-manage--discusslist--toolbar">
    <button class="btn btn-primary" type="submit" @click="all">
    全部&nbsp;<i class="fa fa-list" aria-hidden="true"></i></button>
    <button class="btn btn-primary" type="submit" @click="add">
    添加&nbsp;<i class="fa fa-plus" aria-hidden="true"></i></button>
    <button class="btn btn-primary" type="submit" @click="del">
    删除&nbsp;<i class="fa fa-times" aria-hidden="true"></i></button>
    <button class="btn btn-primary" type="submit" @click="search">
    搜索&nbsp;<i class="fa fa-search" aria-hidden="true"></i></button>
  </div>
  <!-- <Discedit v-show="currentToolbar == 'add'"></Useredit> -->
  <ul class="list-group" v-show="currentToolbar != 'add'">
      <li class="list-group-item" v-for="discussItem in discussList" style="height: 50px;">
          <div class="col-lg-3">{{discussItem.author}}</div>
          <div class="col-lg-4">
            <a href="#"><i class="fa fa-1x fa-user" aria-hidden="true"></i>{{discussItem.contact}}</a>
          </div>
          <div class="col-lg-3">
            <a href="#"><i class="fa fa-1x fa-hand-o-right" aria-hidden="true"></i>
            	<div class="btn-group">
  					<button type="button" class="btn btn-secondary btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{discussItem.state}}</button>
  					<div class="dropdown-menu">
    					<a class="dropdown-item" href="#" @click="updateDiscuss(discussItem, 'verify')"><i class="fa fa-circle" aria-hidden="true"></i>待审核</a>
    					<a class="dropdown-item" href="#" @click=" (discussItem, 'pass')"><i class="fa fa-check" aria-hidden="true"></i>通过</a>
    					<a class="dropdown-item" href="#" @click="updateDiscuss(discussItem, 'unpass')"><i class="fa fa-close" aria-hidden="true"></i>屏蔽</a>
    					<div class="dropdown-divider"></div>
  					</div>
				</div>
			</a>
          </div>
          <div class="btn-group">
              <button type="button" class="btn btn-secondary dropdown-toggle btn-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-1x fa-cog" aria-hidden="true"></i>操作</button>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#">
                	<i class="fa fa-1x fa-eye" aria-hidden="true"></i>
                	预览
                </a>
                <a class="dropdown-item" href="#" @click="delDiscuss(discussItem.id)">
                	<i class="fa fa-1x fa-times" aria-hidden="true"></i>
                	删除
                </a>
              </div>
            </div>
        </li>
      </ul>

    <Pagination parentshow="管理" childshow="评论" trigger="discussCardListPageChange" current="discussCurrentPage" v-show="currentToolbar != 'add'"></Pagination>
   </div>
</template>
<style type="text/css">
#div-manage--discusslist--toolbar
{
  margin-bottom: 10px;
}
</style>
<script>
import { mapState } from 'vuex';
import Pagination 	from './Pagination.vue';
export default {
  data () {
    return { currentToolbar:'all'}
  },
  computed: mapState({
      discussList: state=> state.discussCardList,
      isShow: state=> (state.parentNavItem.text == '管理') && (state.manageParentNavItem.text == '评论')
    }),
  components:{
  	Pagination
  },
  methods:{
    all:function(){
      this.currentToolbar = 'all';
    },
    add:function(){
      this.currentToolbar = 'add';
      this.$store.dispatch('discussCardChange', null);
    },
    del:function(){
      this.currentToolbar = 'del';
    },
    search:function(){
      this.currentToolbar = 'search';
    },
  	delDiscuss:function(id){
  		this.$store.dispatch('delDiscuss', id);
  	},
    updateDiscuss:function(discussItem, state){
        discussItem.state = state;
        this.$store.dispatch('updateDiscuss', discussItem);
    }
  }
 }
</script>