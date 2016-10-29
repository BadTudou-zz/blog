import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

 export default new Vuex.Store({
  state: {
    parentNavItem:{text:'文章', link:'#article'},
    childNavItem:{text:'全部', link:'#'}
  },
  actions:{
  	// menuitemchange(context){
  	// 	context.emit('menuitemchange');
  	// }
  },
  mutations: {
    parentNavItemChange (state, parentNavItem) {
    	console.log('store mutations parentmenuitemchange');
    	state.parentNavItem = parentNavItem;
    	state.childNavItem = {text:'全部', link:'#'};
    }
  }
});