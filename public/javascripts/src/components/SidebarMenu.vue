<template>
<div id="div-siderbadmenu">
	<ul class="nav nav-pills nav-stacked">
  		<li class="nav-item" v-for="menuItem in menu">
    		<a href="#" class="nav-link" :class="{'active':isActivite(menuItem)}" @click="setActiveMenuItem(menuItem)">
    			<i class="fa fa-2x" :class="menuItem.icon" aria-hidden="true"></i>
    			{{menuItem.text}}
    		</a>
  		</li>
	</ul>
</div>
</template>
<style type="text/css">
</style>
<script>
export default {
	data () {
 		return {
 			menu:[
 				{text:'仪表盘', href:'', trigger:'', icon:'fa-tachometer'},
 				{text:'用户', href:'', trigger:'userListPageChange', icon:'fa-child'},
 			 	{text:'文章', href:'', trigger:'articleCardListPageChange', icon:'fa-file'},
 			 	{text:'专题', href:'', trigger:'featureCardListPageChange', icon:'fa-briefcase'},
 			 	{text:'评论', href:'', trigger:'', icon:'fa-commenting'},
 				{text:'系统', href:'', trigger:'', icon:'fa-cog'}
 			],
 			activeMenuItem: {text:'仪表盘'}
 		}
 	},
 	methods:{
 		setActiveMenuItem:function(menuItem){
 			this.activeMenuItem = menuItem;
 			this.$store.dispatch('manageParentNavItemChange', menuItem);
 			this.$store.dispatch('childNavItemChange', menuItem);
 			this.$store.dispatch(menuItem.trigger, 1);
 		},
 		isActivite:function(menuItem){
 			return this.activeMenuItem.text == menuItem.text;
 		}
 	}
}
</script>