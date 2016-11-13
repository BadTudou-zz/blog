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
  <ul class="list-group" v-show="currentToolbar != 'add'">
      <li class="list-group-item" v-for="userItem in userList" style="height: 50px;">
          <div class="col-lg-4">{{userItem.name}}</div>
          <div class="col-lg-4">
            <div class="input-group">
              <span class="input-group-addon" id="basic-addon1">
                <i class="fa fa-1x fa-user" aria-hidden="true"></i>
              </span>
              <input size="10" :readonly="!isEditable(userItem.name)" :value="userItem.nickname" @change="updateUserNickname(userItem.name, $event)"></input>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="input-group">
              <span class="input-group-addon" id="basic-addon1">
                <i class="fa fa-child" aria-hidden="true"></i>
              </span>
              <select class="form-control" id="select-usertype" v-model="userItem.authority" @change="updateUserAuthority(userItem.name, $event)">
                    <option value="website">全站</option>
                    <option value="feature">专题</option>
                    <option value="article">文章</option>
              </select>
            </div>
          </div>
          <div class="btn-group col-lg-1" >
              <button type="button" class="btn btn-secondary dropdown-toggle btn-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-1x fa-cog" aria-hidden="true"></i></button>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#">
                	<i class="fa fa-1x fa-eye" aria-hidden="true"></i>
                	预览
                </a>
                <a class="dropdown-item" href="#" @click="editUser(userItem.name)">
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
input
{
  display: inline;;
}
select
{
  height:30px; line-height:30px;
}
#div-manage--userlist--toolbar
{
  margin-bottom: 10px;
}
</style>
<script>
import { mapState } from 'vuex';
import Pagination 	from './Pagination.vue';
export default {
  data () {
    return { currentUser:{
                  name:'',
                  nickname:'',
                  authority:''
            },
            currentToolbar:'all'
    }
  },
  computed: mapState({
      userList: state=> state.userList,
      isShow: state=> (state.parentNavItem.text == '管理') && (state.manageParentNavItem.text == '用户')
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
    updateUser:function(){
      this.$store.dispatch('updateUser', this.currentUser);
    },
    updateUserNickname:function(name, e){
      this.currentUser.name = name;
      this.currentUser.nickname = e.srcElement.value;
      console.log(JSON.stringify(this.currentUser));
      this.updateUser();
    },
    updateUserAuthority(name, e)
    {
      this.currentUser.name = name;
      this.currentUser.authority = e.srcElement.value;
      console.log('更改权限'+e.srcElement.value);
      this.updateUser();
    },
    editUser:function(name){
      this.currentUser.name = name;
    },
    isEditable:function(name){
      return this.currentUser.name == name;
    }
  }
 }
</script>