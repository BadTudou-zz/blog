<template>
<div id="div-article"  class="col-lg-9" v-show="isShow">
    <iframe id="iframe-article" :src="articleCurrentSrc" class="col-lg-12"></iframe>
</div>
</template>
<style type="text/css">
#iframe-article
{
	border:none; height: 700px;
}
</style>
<script>
import { mapState } from 'vuex';

export default {
	props:['show'],
    computed: mapState({
      articleCurrentSrc: state => ('article/'+state.articleCurrent.link+'.html'),
      isShow:function(){
        	return (this.$store.state.parentNavItem.text == '文章' &&
        		this.$store.state.childNavItem.text == '查看')
        }
    })
}
</script>