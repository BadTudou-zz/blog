<template>
<div id="div-discusslist" class="col-lg-9" v-show="isShow">
	<span class="col-lg-6"><h4>评论列表<span class="label label-default">All</span></h4></span>
	<span class="col-lg-offset-4"><button type="button" class="btn btn-link" @click="newDiscussShow = true">我要评论</button></span>
	<ul class="list-group" v-show="!newDiscussShow">
        <li class="list-group-item " v-for="discussItem in discussList">
        	<div class="col-lg-2 discuss-author"><i class="fa fa-1x fa-user" aria-hidden="true"></i>{{discussItem.author}}</div>
            <div class="col-lg-4 discuss-time"><i class="fa  fa-1x fa-clock-o" aria-hidden="true"></i>{{new Date(discussItem.timeCreate).toLocaleString()}}</div>
            <div class="col-lg-12 discuss-content">{{discussItem.content}}</div>
        </li>
    </ul>
    <Newdiscuss v-show="newDiscussShow"></Newdiscuss>
</div>
</template>
<style type="">
#div-discusslist
{
	margin-top: 10px; margin-left: 5px;
}
#div-discusslist>ul>li
{
	height: 100px;
}
.discuss-author
{
	color:#0099F6;
}
.discuss-time
{
	color:#0A89AC;
}
.discuss-content
{
  	color:#FF9500; height: 70px;
}
</style>
<script>
import { mapState } from 'vuex';
import Newdiscuss 	from './NewDiscuss.vue';
export default {
	data () {
 		return {
 			newDiscussShow:false
 		}
 	},
  	components:{
  		'Newdiscuss':Newdiscuss
  	},
  	computed: mapState({
      discussList: state=> state.discussList,
      isShow:function(){
          return (this.$store.state.parentNavItem.text == '文章' && 
            this.$store.state.childNavItem.text == '查看');
        }
  })
}
</script>