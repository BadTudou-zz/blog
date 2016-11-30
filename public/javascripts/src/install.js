import Vue          from 'vue';
import Vuex         from 'vuex';
import store        from './vuex/store_install.js';
//import App from './components/App.vue';
import Logo 		    from './components/Logo.vue';
import Useredit     from './components/UserEdit.vue';
import Footerbar 		from './components/Footer.vue';

import { mapState } from 'vuex';
var vm = new Vue({
  store,
  el: '#app',
  computed: mapState({
      mysql: state=> state.conf.mysql,
      progress: state=> state.progress,
      mysqlTestResult: state=> state.mysqlTestResult,
      tablelCreatedResult: state=>state.tablelCreatedResult,
      userCurrent: state=>state.userCurrent
  }),
  methods:{
    testDatabaseConf:function(){
      this.$store.dispatch('testDatabaseConf');
    },
    createDatabseTable:function(){
      this.$store.dispatch('createDatabseTable');
    }
  },
  components: { 
  	Logo, Useredit, Footerbar
  }
});