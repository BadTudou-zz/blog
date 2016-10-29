<template>
<div id="div-contact" class="col-lg-9" v-show="isShow">
    <div id="div-contact--content" class="jumbotron">
    	<h5 class="display-4 text-center">联系</h5>
        <div style="color:#006DE0">
            <p class="lead">
            	<br>
            	<i class="fa fa-2x fa-qq" aria-hidden="true">&nbsp;1217473249</i><br>
            	<i class="fa fa-2x fa-weibo" aria-hidden="true">&nbsp;<a href="http://weibo.com/badtudou" title="BadTudou">BadTudou</a></i><br>
            	<i class="fa fa-2x fa-github" aria-hidden="true"><a href="https://github.com/BadTudou">&nbsp;github.com/BadTudou</a></i><br>
            	<i class="fa fa-2x fa-rocket" aria-hidden="true"><a href="https://zhuanlan.zhihu.com/DuXiaoDou" title="知乎@杜小豆">&nbsp;知乎@杜小豆</a></i><br>
            	<hr class="m-y-md">
            </p>
        </div>
        <p>众里寻他千百度，蓦然回首，那人却在，灯火阑珊处。</p>
    </div>
</div>
</template>
<style type="text/css">
#div-contact--content
{
	background-color: #FFF; padding-top: 5px; height: 450px;
}
</style>
<script>
import { mapState } from 'vuex';
export default {
  computed: mapState({
      isShow: state=> state.parentNavItem.text == '联系'
  })
}
</script>
