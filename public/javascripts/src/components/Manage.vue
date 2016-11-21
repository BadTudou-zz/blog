<template>
<div id="div-manage" class="col-lg-9" v-show="isShow">
	<div class="col-lg-3">
		<Sidebar></Sidebar>
	</div>
	<div class="col-lg-9">
		<Dashboard></Dashboard>
	</div>
	<div class="col-lg-9">
		<Userlist></Userlist>
	</div>
	<div class="col-lg-9">
		<Articlelist></Articlelist>
	</div>
	<div class="col-lg-9">
		<Featurelist></Featurelist>
	</div>
	<div class="col-lg-9">
		<Discusslist></Discusslist>
	</div>
	<div class="col-lg-9">
		<Visitorlist></Visitorlist>
	</div>
</div>
</template>
<script>
import { mapState } from 'vuex';
import Sidebar from './SidebarMenu.vue';
import Dashboard from './Dashboard.vue';
import Userlist from './Userlist.vue';
import Articlelist from './Articlelist.vue';
import Featurelist from './Featurelist.vue';
import Discusslist from './Discusslist.vue';
import Visitorlist from './Visitorlist.vue';
export default {
	data () {
 		return {
 			
 		}
 	},
 	computed: mapState({
    	isShow: state => (state.parentNavItem.text == '管理') && (state.loginState)
  	}),
  	components:{
  		Sidebar, Dashboard, Userlist, Articlelist, Featurelist, Discusslist,
  		Visitorlist
  	}
}
</script>