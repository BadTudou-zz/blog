<template>
<div class="col-lg-9" v-show="isShow" id="div-login">
  <div class="card col-lg-offset-3 col-lg-6 text-center">
    <div class="img-circle img-thumbnail img-responsive" id="div-login-logo">
      <i class="fa fa-4x fa-rocket" aria-hidden="true"></i>
    </div>
    <div class="card-block">
      <h4 class="card-title">登陆</h4>
      <form id="div-form">
        <input type="text" class="form-control" id="input-name" placeholder="用户名" v-model=" user.name">
        <input type="password" class="form-control" id="input-password" placeholder="密码" v-model="user.password">
      </form>
    </div>
    <div class="card-block">
      <a href="#" class="btn btn-primary" @click="login()">立即登陆</a><br>
      <a href="#" class="card-link text-right">忘记密码?</a>
    </div>
  </div>
</div>
</template>
<style type="text/css">
#div-login-logo
{
  color: #0099F0; width: 90px; height: 90px; margin-top: 5px; padding-top: 10px;
}
#div-form, #div-form>input
{
  margin-top: 15px;
}
</style>
<script>
import { mapState } from 'vuex';
export default {
 	data () {
 		return { 
 			user:{
 				name:'',
 				password:''
 			}
 		}
 	},
  computed: mapState({
    isShow: state => (state.parentNavItem.text == '管理') && (!state.loginState)
  }),
 	methods:{
 		login: function(){
 			this.$store.dispatch('login', this.user);
 		}
 	}
}
</script>