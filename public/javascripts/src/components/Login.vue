<template>
<div id="div-login"  class="col-lg-12" v-show="isShow">
    <div class="col-lg-offset-2 col-lg-8">
        <form>
          <fieldset class="form-group">
            <label for="input-name">用户名</label>
            <input type="text" class="form-control" id="input-name" placeholder="用户名" v-model="user.name">
          </fieldset>
      
          <fieldset class="form-group">
            <label for="input-password">密码</label>
            <input type="password" class="form-control" id="input-password" placeholder="密码" v-model="user.password">
          </fieldset>

          <fieldset class="form-group">
            <div class="col-lg-offset-6 col-lg-6">
              <button type="button" class="btn btn-primary" @click="login()">登陆</button>
              <button type="button" class="btn btn-link text-center">忘记密码?</button>
            </div>
          </fieldset>
        </form>
    </div>
</div>
</template>
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
    isShow: state => !state.loginState
  }),
 	methods:{
 		login: function(){
 			this.$store.dispatch('login', this.user);
 		}
 	}
}
</script>