<template>
<div id="div-intro" class="col-lg-3">
    <div class="card">
        <div id="div-intro--cardheader" class="card-header text-left">
         作者信息
       	</div>
      	<img id="img-headProtrait" src="images/system/head-protrait.jpg" alt="Card image"  class="img-circle img-thumbnail img-responsive center-block" >
        <div class="card-block" style="padding: 5px">
            <h4 class="card-title text-center">{{master.nickname}}</h4>
            <h6 class="card-subtitle text-muted text-center">{{master.summary}}</h6>
        </div>
     
        <div id="div-intro--text1" class="card-block">
            <p class="card-text">
               {{master.instructionPartOne}}
            </p>
        </div>

        <div id="div-intro--text2" class="card-block">
           <p class="card-text">
             {{master.instructionPartTwo}}
           </p>
        </div>

        <div id="div-intro--contact" class="card-block">
           <div class="col-lg-4">
                <a :href="master.weibo" title="WeiBo"><i class="fa fa-2x fa-weibo"aria-hidden="true"></i></a><br>微博
           </div>
           <div class="col-lg-4">
             	<a :href="master.github" title="GitHub"><i class="fa fa-2x fa-github" aria-hidden="true"></i></a><br>Git
           </div>
           <div class="col-lg-4">
             	<a :href="master.zhihu" title="知乎"><i class="fa fa-2x fa-rocket" aria-hidden="true"></i></a><br>知乎
           	</div>
        </div>
    </div>  
</div>
</template>
<style type="text/css">
#div-intro--cardheader
{
	margin-bottom: 10px;  background-color: #006DE0; color:#fff;
}
#img-headProtrait
{
	height: 100px; width: 100px;
}
#div-intro--contact
{
	padding: 30px; margin-bottom:30px;
}
#div-intro--text1,#div-intro--text2
{
	padding: 5px; font-size: 80%;	
}
</style>
<script>
import { mapState } from 'vuex';
export default {
  computed: mapState({
      master: state=> state.conf.master
   })
}
</script>