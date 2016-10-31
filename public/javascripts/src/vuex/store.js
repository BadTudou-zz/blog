import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource'
Vue.use(Vuex);
Vue.use(VueResource);

 export default new Vuex.Store({
  state: {
  	DEBUG:false, //值为false时表示开启调试
    parentNavItem:{text:'文章', link:'#article'},
    childNavItem:{text:'全部', link:'#'},
    articleCardList:'',
    articlePerPage:6,
    articleCurrentPage:1,
    featureCardList:'',
    featurePerPage:6,
    featureCurrentPage:1
  },
  actions:{
  	articleCardListPageChange(context, page){
  		context.commit('articleCardListPageChange',page);
  	}
  	// menuitemchange(context){
  	// 	context.emit('menuitemchange');
  	// }
  },
  mutations: {
    parentNavItemChange (state, parentNavItem) {
    	console.log('store mutations parentmenuitemchange');
    	state.parentNavItem = parentNavItem;
    	state.childNavItem = {text:'全部', link:'#'};
    },
    articleCardListPageChange (state, page){
    	console.log('store article list page change'+page);
        var from = (page-1)*state.articlePerPage;
        var count = state.articlePerPage;
        Vue.http.get(`/article?action=article-range&from=${from}&count=${count}`).then((response) => 
        {
          console.assert(state.DEBUG, response.body);
          var data = JSON.parse(response.body);
          if(!data.err && data.result.length){
          	state.articleCurrentPage = page;
            state.articleCardList = data.result;
          }else{
            console.assert(state.DEBUG, '获取文章数据失败');
          }
        });
    },
    featureCardListPageChange (state, page){
    	console.log('store article list page change'+page);
        var from = (page-1)*state.featurePerPage;
        var count = state.featurePerPage;
        Vue.http.get(`/feature?action=feature-range&from=${from}&count=${count}`).then((response) => 
        {
          console.assert(state.DEBUG, response.body);
          var data = JSON.parse(response.body);
          if(!data.err && data.result.length){
          	state.featureCurrentPage = page;
            state.featureCardList = data.result;
          }else{
            console.log('获取专题数据失败');
          }
          callback(data.err);
        });
    }

  }
});