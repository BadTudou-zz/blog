<template>
<div  id="div-manage--userlist" v-show="isShow">
    <ul class="list-group">
        <li class="list-group-item" v-for="userItem in userList" style="height: 50px;">
          <div class="col-lg-4">{{userItem.name}}</div>
          <div class="col-lg-4"><i class="fa fa-1x fa-user" aria-hidden="true"></i>{{userItem.nickname}}</div>
          <div class="col-lg-3"><i class="fa fa-child" aria-hidden="true"></i>{{userItem.authority}}</div>
          <div class="btn-group col-lg-1" >
              <button type="button" class="btn btn-secondary dropdown-toggle btn-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-1x fa-cog" aria-hidden="true"></i></button>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#">
                	<i class="fa fa-1x fa-eye" aria-hidden="true"></i>
                	预览
                </a>
                <a class="dropdown-item" href="#">
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
    <Pagination parentshow="管理" childshow="用户" trigger="userListPageChange" current="userCurrentPage"></Pagination>
   </div>
</template>
<script>
import { mapState } from 'vuex';
import Pagination 	from './Pagination.vue';
export default {
  computed: mapState({
      userList: state=> state.userList,
      isShow: state=> (state.parentNavItem.text == '管理') && (state.manageParentNavItem.text == '用户')
    }),
  components:{
  	Pagination
  },
  methods:{
  	delUser:function(name){
  		this.$store.dispatch('delUser', name);
  	}
  }
 }
</script>