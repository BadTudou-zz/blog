import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
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
    articleSearchCurrentPage:1,
    articleSearchText:'',
    articleCurrent:{
      id:'', featureID:'', title:'', subtitle:'', link:'', 
      author:'', introduction:'', coverLink:'', content:'', countRead:0,
      countShare:0, countDiscuss:0, labels:''
    },
    isArticleUpdate:false,
    featureCardList:'',
    featurePerPage:6,
    featureCurrentPage:1,
    featureCurrent:{
      id:'', 
      title:'', 
      timeCreate:'', 
      author:'', 
      introduction:'',
      countArticle:0
    },
    isFeatureUpdate:false,
    discussCardList:'',
    discussList:'',
    discussPerPage:6,
    disscussCurrent:{
      id:0, author:'', contact:'', discussID:'', timeCreate:'', 
      content:'', state:'', mask:'', type:'' ,state:'',
      mask:'', type:''
    },
    discussCurrentPage:1,
    msgboxIsShow:false,
    msgType:'info',
    msgText:'',
    user:'',
    loginState:false,
    manageParentNavItem:{text:'用户'},
    userList:'',
    userPerPage:6,
    userCurrentPage:1,
    userCurrent:{
      name:'', nickname:'', authority:'', password:'', question:'',
      anser:'', authority:''
    },
    isUserUpdate:false,
    visitorCardList:'',
    visitorPerPage:6,
    visitorCurrentPage:1
  },
  actions:{
  	parentNavItemChange(context, parentNavItem)
  	{
  		context.commit('parentNavItemChange', parentNavItem);
  	},
    manageParentNavItemChange(context, manageParentNavItem){
      context.commit('manageParentNavItemChange', manageParentNavItem);
    },
  	childNavItemChange(context, childNavItem)
  	{
  		context.commit('childNavItemChange', childNavItem);
  	},
    articleCardChange(context, articleCard)
    {
      context.commit('articleCardChange',articleCard);
      console.log('文章ID'+articleCard.id);
      context.commit('discussListChange', articleCard.id);
    },
  	articleCardListPageChange(context, page){
  		context.commit('articleCardListPageChange',page);
  	},
  	featureCardListPageChange(context, page){
  		context.commit('featureCardListPageChange',page);
  	},
    featureCardChange(context, featureCard)
    {
      context.commit('featureCardChange',featureCard);
    },
  	articleCardSearchPageTextChange(context, text){
  		context.commit('articleCardSearchPageTextChange', text);
  	},
  	articleCardSearchPage(context, page){
  		console.log('页码'+page);
  		context.commit('articleCardSearchPage', page);
  	},
    addArticleDiscuss(context, discuss){
      discuss.discussID = context.state.articleCurrent.id;
      context.commit('addArticleDiscuss', discuss);
      if (context.state.msgType == 'success')
        context.commit('showMessage',{type:'success', text:'添加评论成功，正在审核'});
      else
        context.commit('showMessage',{type:'err', text:'添加评论失败。'});

    },
    updateDiscuss(context, discuss){
      context.commit('updateDiscuss', discuss);
    },
    delDiscuss(context, discussId){
      context.commit('delDiscuss', discussId);
    },
    userCardChange(context, userCard)
    {
      context.commit('userCardChange',userCard);
    },
    discussCardListPageChange(context, page){
      context.commit('discussCardListPageChange',page);
    },
    discussCardChange(context, discussCard)
    {
      context.commit('discussCardChange',discussCard);
    },
    updateDiscuss(context, discuss){
      context.commit('updateDiscuss', discuss);
    },
    visitorCardListPageChange(context, page){
      context.commit('visitorCardListPageChange',page);
    },
    showMessage(context, message){
      context.commit('showMessage', message);
    },
    login(context, user){
      context.commit('login', user);
      if (!context.state.loginState)
        context.commit('showMessage',{type:'err', text:'登陆失败。'});
    },
    userListPageChange(context, page){
      context.commit('userListPageChange',page);
    },
    addUser(context, user){
      context.commit('addUser', user);
    },
    delUser(context, name){
      context.commit('delUser', name);
      if (context.state.msgType == 'success')
        context.commit('showMessage',{type:'success', text:'删除用户成功'});
      else
        context.commit('showMessage',{type:'err', text:'删除用户失败'});
    },
    delVisitor(context, visitorId){
      context.commit('delVisitor', visitorId);
    },
    updateUser(context, user){
      context.commit('updateUser', user);
      if (context.state.msgType == 'success')
        context.commit('showMessage',{type:'success', text:'修改用户成功'});
      else
        context.commit('showMessage',{type:'err', text:'修改用户失败'});
    },
    delArticle(context, articleId){
      context.commit('delArticle', articleId);
    },
    addFeature(context, feature){
      context.commit('addFeature', feature);
    },
    updateFeature(context, feature){
      context.commit('updateFeature', feature);
    },
    delFeature(context, featureId){
      context.commit('delFeature', featureId);
    }
  },
  mutations: {
    parentNavItemChange (state, parentNavItem) {
    	console.log('store mutations parentmenuitemchange');
    	state.parentNavItem = parentNavItem;
    	state.childNavItem = {text:'全部', link:'#'};
    },
    manageParentNavItemChange (state, manageParentNavItem){
      state.manageParentNavItem = manageParentNavItem;
    },
    childNavItemChange (state, childNavItem) {
    	state.childNavItem = childNavItem;
    },
    articleCardChange (state, articleCard) {
      state.articleCurrent = articleCard;
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
            console.assert(state.DEBUG, '获取专题数据失败');
          }
        });
    },
    visitorCardListPageChange (state, page){
        console.log('store article list page change'+page);
        var from = (page-1)*state.featurePerPage;
        var count = state.featurePerPage;
        Vue.http.get(`/manage?action=visitor-range&from=${from}&count=${count}`).then((response) => 
        {
          console.assert(state.DEBUG, response.body);
          var data = JSON.parse(response.body);
          if(!data.err && data.result.length){

            state.visitorCurrentPage = page;
            state.visitorCardList = data.result;
          }else{
            console.assert(state.DEBUG, '获取访客数据失败');
          }
        });
    },
    articleCardSearchPageTextChange (state, text){
    	state.articleSearchText = text;
    },
    articleCardSearchPage (state, page){
    	var text = state.articleSearchText;
    	var from = (page-1)*state.articlePerPage;
    	var count = state.articlePerPage;
    	Vue.http.put(`article?action=article-search-title`,{condition:text,from:from,count:count}).then((response)=>
    	{
    		console.assert(state.DEBUG, '搜索文章结果'+response.body);
    		var data = JSON.parse(response.body);
        if(!data.err){
          console.log('搜索文章成功'+response.body);
          state.articleCardList = data.result;
          if(data.result.length)
          	state.articleSearchCurrentPage = page;
          }else{
            console.assert(state.DEBUG, '搜索文章数据失败');
          }
    	});
    },
    featureCardChange(state, featureCard){
      state.featureCurrent = featureCard;
    },
    userCardChange(state, userCard){
      state.userCurrent = userCard;
    },
    discussCardChange(state, discussCard){
      state.discussCurrent = discussCard;
    },
    discussCardListPageChange (state, page){
        console.log('store disscuss list page change'+page);
        var from = (page-1)*state.discussCurrentPage;
        var count = state.discussPerPage;
        Vue.http.get(`/manage?action=discuss-range&from=${from}&count=${count}`).then((response) => 
        {
          console.assert(state.DEBUG, response.body);
          var data = JSON.parse(response.body);
          if(!data.err && data.result.length){
            state.discussCurrentPage = page;
            state.discussCardList = data.result;
          }else{
            console.assert(state.DEBUG, '获取评论数据失败');
          }
        });
    },
    updateDiscuss (state, discuss){
      console.log('store updateDiscuss'+JSON.stringify(discuss));
      Vue.http.put(`manage?action=discuss-edit`,{discuss:discuss}).then((response)=>{
        var data = JSON.parse(response.body);
        console.log(response.body);
        if(!data.err)
          state.msgType = 'success';        
      });
    },
    discussListChange (state, articleId) {
      console.log(articleId);
      Vue.http.get(`/article?action=article-discuss&id=${articleId}`).then((response) => 
      {
        console.log(response.body);
        var data = JSON.parse(response.body);
        if(!data.err)
          state.discussList = data.result;
        else
          console.assert(state.DEBUG, '获取文章评论失败');
      });
    },
    addArticleDiscuss (state, discuss) {
      Vue.http.put(`/article?action=article-discuss`,{newDiscuss:discuss}).then((response)=>
      {
          console.log(response.body);
          var data = JSON.parse(response.body);
          if(!data.err)
            state.msgType = 'success';
          else
            state.msgType = 'err';
      });
    },
    showMessage (state, message) {
      console.log('显示消息框');
      state.msgboxIsShow = true;
      state.msgType = message.type;
      state.msgText = message.text;
      setTimeout(function(){
        state.msgboxIsShow = false;
      }, 2000);
    },
    login (state, user) {
      console.log(JSON.stringify(user));
      Vue.http.get(`/manage?action=user-login&name=${user.name}&password=${user.password}`).then((response)=>{
          var data = JSON.parse(response.body);
          if(!data.err){
            state.user = user;
            state.loginState = true;
            state.msgType = 'success';
          }
          else{
            state.loginState = false;
            state.msgType = 'err';
          }
      });
    },
    addUser (state, user){
      Vue.http.put(`manage?action=user-add`,{user:user}).then((response)=>{
        var data = JSON.parse(response.body);
        console.log(response.body);
        if(!data.err)
          state.msgType = 'success';
      });
    },
    userListPageChange (state, page){
      console.log('store user list page change'+page);
        var from = (page-1)*state.userPerPage;
        var count = state.userPerPage;
        Vue.http.get(`/manage?action=user-range&from=${from}&count=${count}`).then((response) => 
        {
          console.assert(state.DEBUG, response.body);
          var data = JSON.parse(response.body);
          if(!data.err && data.result.length){
            state.userCurrentPage = page;
            state.userList = data.result;
          }else{
            console.assert(state.DEBUG, '获取用户数据失败');
          }
        });
    },
    delUser (state, name){
      console.log('store delUser'+name);
      Vue.http.put(`manage?action=user-del`,{name:name}).then((response)=>{
        var data = JSON.parse(response.body);
        console.log(response.body);
        if(!data.err)
          state.msgType = 'success';
      });
    },
    delVisitor (state, visitorId){
      Vue.http.put(`manage?action=visitor-del`,{id:visitorId}).then((response)=>{
        var data = JSON.parse(response.body);
        console.log(response.body);
        if(!data.err)
          state.msgType = 'success';
      });
    },
    updateUser (state, user){
      console.log('store updateUser'+JSON.stringify(user));
      Vue.http.put(`manage?action=user-edit`,{user:user}).then((response)=>{
        var data = JSON.parse(response.body);
        console.log(response.body);
        if(!data.err)
          state.msgType = 'success';        
      });
    },
    delArticle (state, articleId){
      console.log('store delArticle'+articleId);
      Vue.http.put(`manage?action=article-del`,{id:articleId}).then((response)=>{
        var data = JSON.parse(response.body);
        console.log(response.body);
        if(!data.err)
          state.msgType = 'success';
      });
    },
    addFeature (state, feature){
      Vue.http.put(`manage?action=feature-add`,{feature:feature}).then((response)=>{
        var data = JSON.parse(response.body);
        console.log(response.body);
        if(!data.err)
          state.msgType = 'success';
      });
    },
    updateFeature (state, feature){
      Vue.http.put(`manage?action=feature-edit`,{feature:feature}).then((response)=>{
        var data = JSON.parse(response.body);
        console.log(response.body);
        if(!data.err)
          state.msgType = 'success';
      });
    },
    delFeature (state, featureId){
      console.log('store delFeature'+featureId);
      Vue.http.put(`manage?action=feature-del`,{id:featureId}).then((response)=>{
        var data = JSON.parse(response.body);
        console.log(response.body);
        if(!data.err)
          state.msgType = 'success';
      });
    },
    delDiscuss (state, discussId){
      console.log('store delDiscuss'+discussId);
      Vue.http.put(`manage?action=discuss-del`,{id:discussId}).then((response)=>{
        var data = JSON.parse(response.body);
        console.log(response.body);
        if(!data.err)
          state.msgType = 'success';
      });
    }
  }
});