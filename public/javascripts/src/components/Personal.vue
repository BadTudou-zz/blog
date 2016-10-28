<template>
<div id="div-intro" class="col-lg-3">
    <div class="card">
        <div id="div-intro--cardheader" class="card-header text-left">
         关于我
       	</div>
      	<img id="img-headProtrait" src="images/system/head-protrait.jpg" alt="Card image"  class="img-circle img-thumbnail img-responsive center-block" >
        <div class="card-block" style="padding: 5px">
            <h4 class="card-title text-center">杜小豆</h4>
            <h6 class="card-subtitle text-muted text-center">IT男,程序猿,技术型工作者.</h6>
        </div>
     
        <div id="div-intro--text1" class="card-block">
            <p class="card-text">
               一个农民的后代,不了解乡土,也不懂得城市.
            </p>
        </div>

        <div id="div-intro--text2" class="card-block">
           <p class="card-text">
             我有一个脑袋,装载思想、未来与梦想.
           </p>
        </div>

        <div id="div-intro--contact" class="card-block">
           <div class="col-lg-4">
                <a href="http://weibo.com/badtudou" title="WeiBo"><i class="fa fa-2x fa-weibo"aria-hidden="true"></i></a><br>微博
           </div>
           <div class="col-lg-4">
             	<a href="https://github.com/BadTudou" title="GitHub"><i class="fa fa-2x fa-github" aria-hidden="true"></i></a><br>Git
           </div>
           <div class="col-lg-4">
             	<a href="https://zhuanlan.zhihu.com/DuXiaoDou" title="知乎@杜小豆"><i class="fa fa-2x fa-rocket" aria-hidden="true"></i></a><br>知乎
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