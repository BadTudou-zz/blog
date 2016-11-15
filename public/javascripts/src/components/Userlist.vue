<template>
<div  id="div-manage--userlist" v-show="isShow">
  <div id="div-manage--userlist--toolbar">
    <button class="btn btn-primary" type="submit" @click="all">
    全部&nbsp;<i class="fa fa-list" aria-hidden="true"></i></button>
    <button class="btn btn-primary" type="submit" @click="add">
    添加&nbsp;<i class="fa fa-plus" aria-hidden="true"></i></button>
    <button class="btn btn-primary" type="submit" @click="del">
    删除&nbsp;<i class="fa fa-times" aria-hidden="true"></i></button>
    <button class="btn btn-primary" type="submit" @click="search">
    搜索&nbsp;<i class="fa fa-search" aria-hidden="true"></i></button>
  </div>
  <Useredit v-show="currentToolbar == 'add'"></Useredit>
  <ul class="list-group" v-show="currentToolbar != 'add'">
      <li class="list-group-item" v-for="userItem in userList" style="height: 50px;">
          <div class="col-lg-4">{{userItem.name}}</div>
          <div class="col-lg-3">
            <a href="#"><i class="fa fa-1x fa-user" aria-hidden="true"></i>{{userItem.nickname}}</a>
          </div>
          <div class="col-lg-3">
            <a href="#"><i class="fa fa-1x fa-child" aria-hidden="true"></i>{{userItem.authority}}</a>
          </div>
          <div class="btn-group">
              <button type="button" class="btn btn-secondary dropdown-toggle btn-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-1x fa-cog" aria-hidden="true"></i>操作</button>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#">
                	<i class="fa fa-1x fa-eye" aria-hidden="true"></i>
                	预览
                </a>
                <a class="dropdown-item" href="#" @click="editUser(userItem)">
                	<i class="fa fa-1x fa-pencil-square-o" aria-hidden="true"></i>编辑
                </a>
                <a class="dropdown-item" href="#" @click="delUser(userItem.name)">
                	<i class="fa fa-1x fa-times" aria-hidden="true"></i>
                	删除
                </a>
              </div>
            </div>
        </li>
      </ul>

    <Pagination parentshow="管理" childshow="用户" trigger="userListPageChange" current="userCurrentPage" v-show="currentToolbar != 'add'"></Pagination>
   </div>
</template>
<style type="text/css">
#div-manage--userlist--toolbar
{
  margin-bottom: 10px;
}
</style>
<script>
import { mapState } from 'vuex';
import Useredit     from './UserEdit.vue';
import Pagination 	from './Pagination.vue';
export default {
  data () {
    return { currentToolbar:'all'}
  },
  computed: mapState({
      userList: state=> state.userList,
      isShow: state=> (state.parentNavItem.text == '管理') && (state.manageParentNavItem.text == '用户')
    }),
  components:{
  	Useredit, Pagination
  },
  methods:{
    all:function(){
      this.currentToolbar = 'all';
    },
    add:function(){
      console.log('添加用户');
      this.$store.state.isUserUpdate = false;
      this.currentToolbar = 'add';
      this.$store.dispatch('userCardChange', {
      id:0, author:'', contact:'', discussID:'', timeCreate:'', 
      content:'', state:'', mask:'', type:'' ,state:'',
      mask:'', type:''
    });
    },
    del:function(){
      this.currentToolbar = 'del';
    },
    search:function(){
      this.currentToolbar = 'search';
    },
  	delUser:function(name){
  		this.$store.dispatch('delUser', name);
  	},
    editUser:function(user){
        this.$store.state.isUserUpdate = true;
        this.currentToolbar = 'add';
        this.$store.dispatch('userCardChange', user);
    }
  }
 }
</script>