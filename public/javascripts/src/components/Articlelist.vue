<template>
<div  id="div-manage--articlelist" v-show="isShow">
  <div id="div-manage--articlelist--toolbar">
    <button class="btn btn-primary" type="submit" @click="all">
    全部&nbsp;<i class="fa fa-list" aria-hidden="true"></i></button>
    <button class="btn btn-primary" type="submit" data-toggle="modal" data-target="#div--manage--editarticle" @click="add">
    添加&nbsp;<i class="fa fa-plus" aria-hidden="true"></i></button>
    <button class="btn btn-primary" type="submit" @click="del">
    删除&nbsp;<i class="fa fa-times" aria-hidden="true"></i></button>
    <button class="btn btn-primary" type="submit" @click="search">
    搜索&nbsp;<i class="fa fa-search" aria-hidden="true"></i></button>
</button>
  </div>
  
  <div class="modal fade" id="div--manage--editarticle" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" v-show="currentToolbar == 'add'">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            <span class="sr-only">Close</span>
          </button>
          <h4 class="modal-title" id="myModalLabel">编辑文章</h4>
        </div>
        <div class="modal-body">
          <Articleedit></Articleedit>
        </div>
        <div class="modal-footer">
        </div>
      </div>
    </div>
  </div>

    <ul class="list-group" v-show="currentToolbar != 'add'">
      <li class="list-group-item " v-for="articleItem in articleList" style="height: 50px; margin: 0 auto;">
        <div class="col-lg-4">
          <a href="#"><i class="fa fa-1x fa-file" aria-hidden="true"></i>{{articleItem.title+articleItem.subtitle}}</a>
        </div>
        <div class="col-lg-4">
          <a href="#"><i class="fa fa-1x fa-user" aria-hidden="true"></i>{{articleItem.author}}</a>
        </div>
        <span class="col-lg-2">
          <a href="#"><i class="fa fa-1x fa-archive" aria-hidden="true"></i>{{articleItem.featureID}}</a>
        </span>
        <div class="btn-group col-lg-1" >
            <button type="button" class="btn btn-secondary dropdown-toggle btn-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-1x fa-cog" aria-hidden="true"></i></button>
            <div class="dropdown-menu">
              <a class="dropdown-item" href="#">
                <i class="fa fa-1x fa-eye" aria-hidden="true"></i>
                预览
              </a>
              <a class="dropdown-item" href="#" data-toggle="modal" data-target="#div--manage--editarticle" @click="editArticle(articleItem)">
                <i class="fa fa-1x fa-pencil-square-o" aria-hidden="true"></i>
                编辑
              </a>
              <a class="dropdown-item" href="#" @click="delArticle(articleItem.id)">
                <i class="fa fa-1x fa-times" aria-hidden="true"></i>
                删除
              </a>
            </div>
        </div>
      </li>
    </ul>
    <Pagination parentshow="管理" childshow="文章" trigger="articleCardListPageChange" current="articleCurrentPage" v-show="currentToolbar != 'add'"></Pagination>
   </div>
</template>
<style type="text/css">
input
{
  display: inline;;
}
select
{
  height:30px; line-height:30px;
}
#div-manage--articlelist--toolbar
{
  margin-bottom: 10px;
}
</style>
<script>
import { mapState } from 'vuex';
import Articleedit  from './ArticleEdit.vue';
import Pagination 	from './Pagination.vue';
export default {
  data () {
    return {
      currentToolbar:'all'
    }
  },
  computed: mapState({
      articleList: state=> state.articleCardList,
      isShow: state=> (state.parentNavItem.text == '管理') && (state.manageParentNavItem.text == '文章')
    }),
  components:{
  	Articleedit, Pagination
  },
  methods:{
      all:function(){
        this.currentToolbar = 'all';
      },
      add:function(){
        this.$store.state.isArticleUpdate = false;
        this.$store.commit('getFeatureList');
        this.currentToolbar = 'add';
        this.$store.dispatch('articleCardChange', { id:'', featureID:'', title:'', subtitle:'', link:'', author:'', introduction:'', coverLink:'', content:'', countRead:0,countShare:0, countDiscuss:0, labels:''});
      },
      del:function(){
        this.currentToolbar = 'del';
      },
      search:function(){
        this.currentToolbar = 'search';
      },
      editArticle:function(article){
        this.$store.state.isArticleUpdate = true;
        this.currentToolbar = 'add';
        this.$store.dispatch('articleCardChange', article);
      },
      delArticle:function(articleId){
        this.$store.dispatch('delArticle', articleId);
        this.$store.dispatch('articleCardListPageChange', this.$store.state.articleCurrentPage);
      }
  }
 }
</script>