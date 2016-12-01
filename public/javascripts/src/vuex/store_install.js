import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
Vue.use(Vuex);
Vue.use(VueResource);

export default new Vuex.Store({
  state: {
  	progress:0,
  	mysqlTestResult:'wait',
  	tablelCreatedResult:'wait',
    masterCreatedResult:'wait',
  	userCurrent:{
      name:'', nickname:'', authority:'', password:'', question:'',
      anser:'', authority:''
    },
    conf:{
      website:{
        domain:'BadTudou',
        title:'杜小豆的编程小道',
        ICP:''
      },
      mysql:{
      	host:'',
      	user:'',
      	password:'',
      	database:'',
      	tables: {
				TABLE_ARTICLE:'tb_article',
				TABLE_FEATURE:'tb_feature',
				TABLE_USER:'tb_user',
				TABLE_DISCUSS:'tb_discuss',
				TABLE_VISITOR:'tb_visitor'
			}
      }
    }
  },
 actions:{
 	addUser(context, user){
      context.commit('addUser');
    },
    testDatabaseConf(context){
      context.commit('testDatabaseConf');
    },
    createDatabseTable(context){
      context.commit('createDatabseTable');
    },
    endInstall(context){
      context.commit('endInstall');
    }
 },
 mutations:{
 	addUser (state){
 		console.log('安装时用户'+JSON.stringify(state.userCurrent));
      Vue.http.put(`install?action=master-add`,{master:state.userCurrent}).then((response)=>{
        var data = JSON.parse(response.body);
        console.log(response.body);
        if(!data.err){
            state.progress =  75; 
            state.masterCreatedResult = 'success';
          }
          else{
            state.masterCreatedResult = 'error';
          }
       });
    },
    testDatabaseConf(state){
    	console.log('安装时'+JSON.stringify(state.conf.mysql));
    	Vue.http.put(`install?action=database-test`,{mysql:state.conf.mysql}).then((response)=>{
        	var data = JSON.parse(response.body);
       		console.log(response.body);
        	if(!data.err){
				    state.progress =  25; 
				    state.mysqlTestResult = 'success';
        	}
        	else{
        		state.mysqlTestResult = 'error';
        	}
      	});
    },
    createDatabseTable(state){
    	console.log('安装时'+JSON.stringify(state.conf.mysql.tables));
    	Vue.http.put(`install?action=database-init`,{tables:state.conf.mysql.tables}).then((response)=>{
        	var data = JSON.parse(response.body);
       		console.log(response.body);
        	if(!data.err){
				    state.progress =  50; 
				    state.tablelCreatedResult = 'success';
        	}
        	else{
        		state.tablelCreatedResult = 'error';
        	}
      	});
    },
    endInstall(state){
      Vue.http.put(`install?action=install-end`).then((response)=>{
          var data = JSON.parse(response.body);
          console.log(response.body);
          if(!data.err){
            state.progress +=  25; 
            location.href="/";
          }
          else{
            state.tablelCreatedResult = 'error';
          }
        });
    }
 }
});

