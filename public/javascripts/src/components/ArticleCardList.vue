<template>
<div id="div-articleCartList"  class="col-lg-9" v-show="isShow">
  <div class="card col-lg-4" v-for="articleCardItem in articleCardList">
  	<div class="card-block">
   		<h4 class="card-title">
          <a href="#" @click="view(articleCardItem)">{{articleCardItem.title}}</a>
      </h4>
   		<h6 class="card-subtitle text-muted" :value="articleCardItem.subtitle"></h6>
  	</div>
  	<a :href="'article?action=article-show&id='+articleCardItem.id">
        <img  alt="Card image" class="img-responsive" :title="articleCardItem.title + articleCardItem.subtitle" :src="articleCardItem.coverLink" style="height: 150px;">
    </a>
  	<div class="card-block">
   		<p class="card-text">{{articleCardItem.introduction.substr(0,40)+'.....'}}</p>
   		<a :href="'article?action=article-show&id='+articleCardItem.id" class="card-link" target="_blank"> <i class="fa fa-1x fa-rocket" aria-hidden="true"></i>&nbsp;阅读</a>
   		<a href="#" class="card-link"><i class="fa fa-1x fa-coffee" aria-hidden="true"></i>&nbsp;评论</a>
  		</div>
	</div>
</div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  computed: mapState({
      articleCardList: state=> state.articleCardList,
      isShow:function(){
          return (this.$store.state.parentNavItem.text == '文章' && 
            this.$store.state.childNavItem.text == '全部');
        }
  }),
  methods:{
    view:function(articleCardItem){
      this.$store.dispatch('articleCardChange', articleCardItem);
      this.$store.dispatch('childNavItemChange', {text:'查看', link:'#'});
    }
  }
  
}
</script>