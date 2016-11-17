<template>
<div  id="div-manage--visitorlist" v-show="isShow">
  <div id="div-manage--visitorlist--toolbar">
    <button class="btn btn-primary" type="submit" @click="all">
    全部&nbsp;<i class="fa fa-list" aria-hidden="true"></i></button>
    <button class="btn btn-primary" type="submit" @click="del">
    删除&nbsp;<i class="fa fa-times" aria-hidden="true"></i></button>
    <button class="btn btn-primary" type="submit" @click="search">
    搜索&nbsp;<i class="fa fa-search" aria-hidden="true"></i></button>
  </div>
    <ul class="list-group" v-show="currentToolbar != 'add'">
      <li class="list-group-item " v-for="visitorItem in visitorList" style="height: 50px; margin: 0 auto;">
        <div class="col-lg-5">
          <a href="#"><i class="fa fa-1x fa-clock-o" aria-hidden="true"></i>{{new Date(visitorItem.timeVisited).toLocaleString()}}</a>
        </div>
        <div class="col-lg-3">
          <a href="#" :title="getOSVersion(visitorItem.ua)"><i class="fa fa-1x fa-desktop" aria-hidden="true"></i>{{getOSName(visitorItem.ua)}}</a>
        </div>
        <div class="col-lg-3">
          <a href="#" :title="getBrowserVersion(visitorItem.ua)"><i class="fa fa-1x fa-globe" aria-hidden="true"></i>{{getBrowserName(visitorItem.ua)}}</a>
        </div>
        <div class="col-lg-1" >
            <button type="button" class="btn btn-secondary  btn-sm" title="删除" @click="delVisitor(visitorItem.id)"><i class="fa fa-1x fa-trash" aria-hidden="true"></i>&nbsp;</button>
        </div>
      </li>
    </ul>
    <Pagination parentshow="管理" childshow="访客" trigger="visitorCardListPageChange" current="visitorCurrentPage" v-show="currentToolbar != 'add'"></Pagination>
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
#div-manage--visitorlist--toolbar
{
  margin-bottom: 10px;
}
</style>
<script>
import { mapState } from 'vuex';
var parser = require('../other/ua-parser.min.js')
import Pagination 	from './Pagination.vue';
export default {
  data () {
    return {
      currentToolbar:'all'
    }
  },
  computed: mapState({
      visitorList: state=> state.visitorCardList,
      isShow: state=> (state.parentNavItem.text == '管理') && (state.manageParentNavItem.text == '访客')
    }),
  components:{
  	Pagination
  },
  methods:{
      all:function(){
        this.currentToolbar = 'all';
      },
      del:function(){
        this.currentToolbar = 'del';
      },
      search:function(){
        this.currentToolbar = 'search';
      },
      delVisitor:function(visitorId){
        this.$store.dispatch('delVisitor', visitorId);
        this.$store.dispatch('visitorCardListPageChange', this.$store.state.visitorCurrentPage);
      },
      getOSName(ua){
        var u = parser(ua);
        return u.os.name;
      },
      getOSVersion(ua){
        var u = parser(ua);
        return u.os.version;
      },
      getBrowserName(ua){
        var u = parser(ua);
        return u.browser.name;
      },
      getBrowserVersion(ua){
        var u = parser(ua);
        return u.browser.version;
      }
  }
 }
</script>