import Vue from 'vue';
import Vuex from 'vuex';
import store from './vuex/store';
//import App from './components/App.vue';
import Logo 		from './components/Logo.vue';
import Searchbox 	from './components/SearchBox.vue';
import Navigation 	from './components/Navigation.vue';
import Location 	from './components/Location.vue';
import Ad 			from './components/AD.vue';
import Personal 	from './components/Personal.vue';
import Contact 		from './components/ContactMe.vue';
import About 		from './components/AboutMe.vue';
import Footerbar 		from './components/Footer.vue';

//Vue.use(Vuex);
var vm = new Vue({
  store,
  el: '#app',
  components: { 
  	Logo, Searchbox, Navigation, Location, Personal, 
  	Contact, About, Footerbar, Ad
  }
});