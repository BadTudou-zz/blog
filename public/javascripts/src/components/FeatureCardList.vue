<template>
<div id="div-featureCardList" class="col-lg-9" v-show="isShow">
    <div class="card col-lg-4" v-for="featureCardItem in featureCardList">
        <div class="card-block">
            <h4 class="card-title">
                <a :href="'article?action=article-show&id='+featureCardItem.id">{{featureCardItem.title}}</a>
            </h4>
            <h6 class="card-subtitle text-muted">{{featureCardItem.author}}</h6>
        </div>
        <a :href="'article?action=article-show&id='+featureCardItem.id">
            <img  alt="Card image" class="img-responsive" :title="featureCardItem.title" :src="featureCardItem.coverLink" style="height: 150px;">
        </a>
        <div class="card-block">
            <p class="card-text">{{featureCardItem.introduction.substr(0,40)+'......'}}</p>
            <a :href="'article?action=article-show&id='+featureCardItem.id" class="card-link"> <i class="fa fa-1x fa-rocket" aria-hidden="true"></i>{{featureCardItem.countArticle}}篇</a>
            <a href="#" class="card-link"><i class="fa fa-1x fa-coffee" aria-hidden="true" ></i>{{new Date(featureCardItem.timeCreate).toLocaleDateString()}}</a>
        </div>
    </div>
</div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  computed: mapState({
      isShow: state=> state.parentNavItem.text == '专题',
      featureCardList: state=> state.featureCardList
  })
}
</script>