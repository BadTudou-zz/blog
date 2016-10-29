<template>
<div id="div-location" class="col-lg-9">
    <ol class="breadcrumb">
  		<li><a href="/">主页</a></li>
  		<li><a :href="parentNavItemLink">{{parentNavItemText}}</a></li>
		<li class="active">{{childNavItemText}}</li>
 	</ol>
</div>
</template>
<style type="text/css">
#div-location>ol
{
	background-color: #FFF; border:solid 1px; border-color: #DDD;
}
</style>
<script>
import { mapState } from 'vuex';

export default {
    computed: mapState({
      parentNavItemText: state => state.parentNavItem.text,
      parentNavItemLink: state => state.parentNavItem.link,
      childNavItemText: state => state.childNavItem.text
    })
}
</script>