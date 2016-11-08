<template>
<div id="div-nav" class="navbar navbar-static-top navbar-dark bg-inverse">
	<a class="navbar-brand" href="/">{{title}}</a>
	<ul class="nav navbar-nav">
        <li class="nav-item" :class="{'active':isActivite(menuItem)}" v-for="menuItem,index in menu">
            <a class="nav-link" :href="menuItem.link" @click="changeItem">{{menuItem.text}}</a>
        </li>
      </ul>
</div>
</template>
<style type="text/css">
#div-nav
{
	margin-top: 10px; margin-bottom: 10px; background-color: #0099F0;
}
</style>
<script>
export default {
 	data () {
 		return {
 			title: '杜小豆的编程小道',
 			menu: [
 				{link:'#article',	text:'文章'},
 				{link:'#feature',	text:'专题'},
 				{link:'#manage',	text:'管理'},
 				{link:'#about',		text:'关于'},
 				{link:'#contact',	text:'联系'}],
 			events:{
 				'#article':'articleCardListPageChange',
 				'#feature':'featureCardListPageChange'
 			}
 		}			
 	},
 	methods:
 	{
 		changeItem: function(e){
 			var parentnavitem = {text:e.target.text, link:e.target.href};
 			this.$store.dispatch('parentNavItemChange', parentnavitem);
 			var hashKeyIndex = e.target.href.indexOf('#');
 			var parentNavLink = e.target.href.substring(hashKeyIndex);

 			console.assert(this.$store.state.DEBUG, parentNavLink);
 			this.$store.dispatch(this.events[parentNavLink], 1);
 		},
 		isActivite:function(menuItem){
 			return this.$store.state.parentNavItem.text == menuItem.text;
 		}
 	}
}
</script>