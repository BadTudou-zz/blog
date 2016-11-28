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
    featureList:'',
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
    manageParentNavItem:{text:'仪表盘'},
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
    visitorCurrentPage:1,
    blogState:[
        {icon:'fa-rss',title:'新订阅',value:'0', style:{color:'#006DE0'}},
        {icon:'fa-users',title:'新访客',value:'0', style:{color:'#429AFE'}},
        {icon:'fa-commenting',title:'新评论',value:'0', style:{color:'#03D1FF'}}
    ],
    conf:{
      website:{
        domain:'BadTudou',
        title:'杜小豆的编程小道',
        ICP:''
      },
      master:{
        nickname:"杜小豆",
        summary:"你猜啊",
        instructionPartOne:"介绍",
        instructionPartTwo:"",
        weibo:"http://weibo.com/badtudou",
        github:"https://github.com/BadTudou",
        zhihu:"https://zhuanlan.zhihu.com/DuXiaoDou"
      },
      article:{
        storePath:'',
        templatePath:'',
        cssName:''
      },
      database:{
        storePath:'',
        interval:''
      },
      articleCssList:''
    }
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
    addArticle(context, article){
      context.commit('addArticle', article);
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
      context.commit('getBlogState', 1);
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
    },
    getBlogState(context, days){
      console.log('获取博客状态');
      context.commit('getBlogState', days);
    },
    getFeatureList(context){
      context.commit('getFeatureList');
    },
    getWetsiteConf(context){
      context.commit('getWetsiteConf');
    },
    setWebsiteConf(context, conf){
      context.commit('setWebsiteConf', conf);
    },
    setMasterConf(context, conf){
      context.commit('setMasterConf', conf);
    },
    getMasterConf(context){
      context.commit('getMasterConf');
    },
    getArticleConf(context){
      context.commit('getArticleConf');
    },
    setArticleConf(context, conf){
      context.commit('setArticleConf', conf);
    },
    getDatabaseConf(context){
      context.commit('getDatabaseConf');
    },
    setDatabaseConf(context, conf){
      context.commit('setDatabaseConf', conf);
    },
    getArticleCssList(context){
      context.commit('getArticleCssList');
    },
    backupDatabase(context){
      context.commit('backupDatabase');
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
    addArticle (state, article){
      Vue.http.put(`manage?action=article-add`,{newArticle:article}).then((response)=>{
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
    },
    getBlogState (state, days){
      console.log('store getBlogState'+days);
      Vue.http.get(`/manage?action=blog-state&days=${days}`).then((response) => 
        {
          console.assert(state.DEBUG, response.body);
          var data = JSON.parse(response.body);
          if(!data.err){
            console.log(data.result.visitorCount);
            state.blogState[1].value = data.result.visitorCount;
            state.blogState[2].value = data.result.discussCount;
            console.log(JSON.stringify(state.blogState));
          }
        });
    },
    getFeatureList(state){
      Vue.http.get(`/feature?action=feature-list`).then((response) => 
        {
          console.log('获取专题列表无限制');
          console.assert(state.DEBUG, response.body);
          var data = JSON.parse(response.body);
          if(!data.err && data.result.length){
            state.featureList = data.result;
          }else{
            console.assert(state.DEBUG, '获取专题列表数据失败');
          }
        });
    },
    getWetsiteConf(state){
      Vue.http.get(`/manage?action=conf-website`).then((response) => 
        {
          console.log('获取网站配置数据');
          console.assert(state.DEBUG, response.body);
          var data = JSON.parse(response.body);
          if(!data.err){
            state.conf.website = data.result;
            console.log(state.conf.website);
          }else{
            console.assert(state.DEBUG, '获取网站配置数据失败');
          }
        });
    },
    getMasterConf(state){
      Vue.http.get(`/manage?action=conf-master`).then((response) => 
        {
          console.log('获取博主数据');
          console.assert(state.DEBUG, response.body);
          var data = JSON.parse(response.body);
          if(!data.err){
            state.conf.master = data.result;
            console.log(state.conf.master);
          }else{
            console.assert(state.DEBUG, '获取博主配置数据失败');
          }
        });
    },
    getArticleConf(state){
      Vue.http.get(`/manage?action=conf-article`).then((response) => 
        {
          console.log('获取文章数据');
          console.assert(state.DEBUG, response.body);
          var data = JSON.parse(response.body);
          if(!data.err){
            state.conf.article = data.result;
            console.log(state.conf.master);
          }else{
            console.assert(state.DEBUG, '获取文章配置数据失败');
          }
        });
    },
    getDatabaseConf(state){
      Vue.http.get(`/manage?action=conf-database`).then((response) => 
        {
          console.log('获取文章数据');
          console.assert(state.DEBUG, response.body);
          var data = JSON.parse(response.body);
          if(!data.err){
            state.conf.database = data.result;
            console.log(state.conf.master);
          }else{
            console.assert(state.DEBUG, '获取数据库配置数据失败');
          }
        });
    },
    getArticleCssList(state){
      Vue.http.get(`/manage?action=conf-article-csslist`).then((response) => 
        {
          console.log('获取文章CSS列表');
          console.assert(state.DEBUG, response.body);
          var data = JSON.parse(response.body);
          if(!data.err){
            state.conf.articleCssList = data.result;
            console.log(state.conf.master);
          }else{
            console.assert(state.DEBUG, '获取文章CSS列表数据失败');
          }
        });
    },
    setWebsiteConf(state, conf){
      Vue.http.put(`manage?action=conf-website`,{conf:conf}).then((response)=>{
        var data = JSON.parse(response.body);
        console.log(response.body);
        if(!data.err)
          state.conf.website = conf;
          state.msgType = 'success';
      });
    },
    setMasterConf(state, conf){
      Vue.http.put(`manage?action=conf-master`,{conf:conf}).then((response)=>{
        var data = JSON.parse(response.body);
        console.log(response.body);
        if(!data.err)
          state.conf.master = conf;
          state.msgType = 'success';
      });
    },
    setArticleConf(state, conf){
      Vue.http.put(`manage?action=conf-article`,{conf:conf}).then((response)=>{
        var data = JSON.parse(response.body);
        console.log(response.body);
        if(!data.err)
          state.conf.article = conf;
          state.msgType = 'success';
      });
    },
    setDatabaseConf(state, conf){
      Vue.http.put(`manage?action=conf-database`,{conf:conf}).then((response)=>{
        var data = JSON.parse(response.body);
        console.log(response.body);
        if(!data.err)
          state.conf.database = conf;
          state.msgType = 'success';
      });
    },
    backupDatabase(state){
      Vue.http.put(`manage?action=backup-database`).then((response)=>{
        var data = JSON.parse(response.body);
        console.log(response.body);
        if(!data.err)
          console.log('备份成功');
          state.msgType = 'success';
      });
    }
  }
});