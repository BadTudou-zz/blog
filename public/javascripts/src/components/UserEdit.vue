<template>
<div id="div-manage--edituser" class="col-lg-12">
  <form class="col-lg-8">
      <input type="text" class="form-control" placeholder="用户名" v-model="newUser.name">
      <input type="text" class="form-control" placeholder="昵称" v-model="newUser.nickname">
      <label for="select-usertype">用户类型</label>
      <select class="form-control" id="select-usertype" v-model="newUser.authority">
        	<option value="website">全站</option>
        	<option value="feature">专题</option>
        	<option value="article">文章</option>
      </select>
    <fieldset class="form-group col-lg-offset-9">
        <button type="button" class="btn btn-primary" @click="editUser()">{{isEdit()?'更新':'添加'}}用户</button>
    </fieldset>
  </form>
</div>
</template>
<style type="text/css">
#div-manage--edituser>form>input
{
  margin-top: 15px;
}
</style>
<script>
import { mapState } from 'vuex';
export default {
  computed: mapState({
      newUser: state=> state.userCurrent
  }),
  methods:{
    isEdit:function(){
      return this.$store.state.isUserEdit;
    },
    editUser:function(){
      if (this.isEdit()){
        console.log('更新用户');
        this.$store.dispatch('updateUser', this.newUser);
      } 
      else
      {
        this.$store.dispatch('addUser', this.newUser);
      }
      console.log(JSON.stringify(this.newUser));
    }
  }
}
</script>