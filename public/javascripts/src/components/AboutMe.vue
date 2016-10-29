<template>
<div id="div-about" class="col-lg-9" v-show="isShow">
    <div id="div-about--content" class="jumbotron">
    <h5 class="display-4 text-center">关于</h5>
    <div style="color:#006DE0">
        <p class="lead">写程序，写代码，写情书，这里是<b>杜小豆的编程小道</b>。漫路长行，始于2011。</p>
        <p class="lead">生命，宇宙，以及一切的答案。</p>
        <p class="lead"><b>让我们的思想自由的恋爱吧！</b></p>
        <hr class="m-y-md">
        </div>
        <p>(the answer to life, the universe, and everything)</p>
    </div>
</div>
</template>
<style type="text/css">
#div-about--content
{
  background-color: #FFF; padding-top: 5px; height: 450px;
}
</style>
<script>  
import { mapState } from 'vuex';
export default {
  computed: mapState({
      isShow: state=> state.parentNavItem.text == '关于'
  })
}
</script>