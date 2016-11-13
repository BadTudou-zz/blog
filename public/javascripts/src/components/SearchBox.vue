<template>
<div id="div-searchbox" class="input-group">
    <input type="text" class="form-control" placeholder="搜索文章..." v-model="searchText">
    <span class="input-group-btn">
       	<button class="btn btn-secondary" type="button" @click="search"><i class="fa fa-search" aria-hidden="true"></i>搜索</button>
    </span>
</div>
</template>
<style type="text/css">
#div-searchbox
{
	width: 50%;	margin: auto;
}
</style>
<script>	
export default {
	data () {
 		return {
 			searchText:''
 		}
 	},
 	props:['trigger'],
 	methods:{
 		search: function(){
 			this.$store.dispatch('childNavItemChange', {text:'搜索', link:'#search'});
 			this.$store.dispatch(this.trigger+'TextChange', this.searchText);
 			this.$store.dispatch(this.trigger, 1);
 		}
 	}
}
</script>
