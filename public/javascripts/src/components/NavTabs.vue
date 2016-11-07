<template>
<div id="div-navtabs"  class="col-lg-12" v-show="isShow">
    <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item" v-for="(navItem, navIndex) in navTabs">
          <a class="nav-link" :class="{active:navIndex == 0}" :href="navItem.href" role="tab" data-toggle="tab" >{{navItem.text}}</a>
        </li>
    </ul>
    <div v-html="generateTabs">
    </div>
    
</div>
</template>
<style type="text/css">
.nav-item:hover
{
	color:#FFF;
}
</style>
<script>	
export default {
	data () {
 		return {
 			navTabs:[
 				{text:'用户', href:'href1', trigger:'dd', childen:
 					[
 						{text:'用户-全部', href:'href11', trigger:'dd'},
 						{text:'用户-审核', href:'href12', trigger:'dd'}
 					]
 				},
 				{text:'内容', href:'href2', trigger:'dd', childen:
 					[
 						{text:'内容-专题', href:'href21', trigger:'dd', childen:
 							[
 								{text:'专题-全部', href:'href211', trigger:'dd'},
 								{text:'专题-添加', href:'href212', trigger:'dd'}
 							]
 						},
 						{text:'内容-文章', href:'href22', trigger:'dd', childen:
 							[
 								{text:'文章-全部', href:'href211', trigger:'dd'},
 								{text:'文章-添加', href:'href212', trigger:'dd'}
 							]
 						},
 				 		{text:'内容-评论', href:'href23', trigger:'f', childen:
 				 			[
 				 				{text:'评论-全部', href:'href211', trigger:'dd'},
 								{text:'文章-审核', href:'href212', trigger:'dd'}
 				 			]
 				 		},
 						{text:'内容-留言', href:'href24', trigger:'dd', childen:
 							[
 								{text:'留言-全部', href:'href211', trigger:'dd'},
 								{text:'留言-审核', href:'href212', trigger:'dd'}
 							]
 						}
 					]
 				},
 				{text:'系统', href:'href3', trigger:'dd', childen:
 					[
 						{text:'系统-状态', href:'href211', trigger:'dd'},
 						{text:'系统-日志', href:'href212', trigger:'dd'},
 						{text:'系统-数据库', href:'href211', trigger:'dd'},
 						{text:'系统-设置', href:'href212', trigger:'dd'}
 					]
 				}
 			]
 		}
 	},
 	computed:{
 		generateTabs: function(){
 			var html = '';
 			var tabIndex = 0;
 			for(tabIndex in this.navTabs){
 				var tabItem = this.navTabs[tabIndex];
 				if (typeof(tabItem.childen)!= 'undefined') {
 					html += this.generateChildTabs(tabItem.href, tabItem.childen);
 				}
 			}
 			return html;
 		},
    isShow: function(){
      return this.$store.state.loginState;
    }
 	},
 	methods:{
 		generateChildTabs: function(navHref, navTabs){
 			var itemHtml = '';
 			var tabIndex = 0;
 			var html = `<div class="col-lg-12"><div role="tabpanel"  id="`+navHref+`">
            				<ul class="nav nav-tabs" role="tablist" v-show="`+`">`;
 			for(tabIndex in navTabs){
 				var tabItem = navTabs[tabIndex];
 				var text = tabItem.text;
 				var href = tabItem.href;
 				if (typeof(tabItem.childen) != 'undefined'){
 					html = this.generateChildTabs(tabItem.href, tabItem.childen) + html;
 				}
 				else{
 					itemHtml += `<li class="nav-item">
              				<a class="nav-link" href="`+href+`" role="tab" data-toggle="tab">`+text+`</a></li>`;
 				}
 			}
 			html += itemHtml+`</ul></div></div>`;
 			return html;
 		}
 	}
}
</script>