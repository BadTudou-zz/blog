import Vue          from 'vue';
import Vuex         from 'vuex';
import store        from './vuex/store';
//import App from './components/App.vue';
import Logo 		from './components/Logo.vue';
import Messagebox	from './components/MessageBox.vue';
import Login 		from './components/Login.vue';
import Navtabs 		from './components/NavTabs.vue';
import Footerbar	from './components/Footer.vue';

var vm = new Vue({
  store,
  el: '#app',
  components: { 
  	Logo, Login, Messagebox, Navtabs, Footerbar
  }
});