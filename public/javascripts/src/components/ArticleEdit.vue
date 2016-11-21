<template>

<div id="div-articleedit"  class="col-lg-12">
    <form>
      <fieldset class="form-group">
        <div class="col-lg-4">
          <label for="input-title">标题</label>
          <input type="text" class="form-control" id="input-title" placeholder="标题" v-model="newArticle.title">
        </div>
        <div class="col-lg-6">
          <label for="input-subtitle">副标题</label>
          <input type="text" class="form-control" id="input-subtitle" placeholder="副标题" v-model="newArticle.subtitle" style="font-size: 80%">
        </div>
      </fieldset>

      <fieldset class="form-group">
        <div class="col-lg-4">
          <label for="select-feature">所属专题</label>
          <select class="form-control" v-model="newArticle.featureID">
            <option :value="featureItem.id" v-for="featureItem in featureList">{{featureItem.title}}</option>
          </select>
        </div>

        <div class="col-lg-8">
          <label for="input-link">链接</label>
          <div class="input-group">
            <span class="input-group-addon">https://example.com/</span>
            <input type="text" class="form-control" id="input-link" placeholder="链接" v-model="newArticle.link">
          </div>
        </div>
      </fieldset>

      <fieldset class="form-group">
        <div class="col-lg-12">
          <label for="input-coverLink">封面图片链接</label>
          <input type="text" class="form-control" id="input-coverLink" placeholder="封面图片链接" v-model="newArticle.coverLink">
        </div>
      </fieldset>

      <fieldset class="form-group">
        <div class="col-lg-4">
          <label for="input-author">作者</label>
          <input type="text" class="form-control" id="input-author" placeholder="作者" v-model="newArticle.author">
        </div>
      </fieldset>

      <fieldset class="form-group">
        <div class="col-lg-12">
          <label for="textarea-introduction">简介</label>
          <textarea class="form-control" id="textarea-introduction" rows="3" v-model="newArticle.introduction"></textarea>
        </div>
      </fieldset>

      <fieldset class="form-group">
        <div class="col-lg-12">
          <label for="textarea-content">内容</label>
          <textarea class="form-control" id="textarea-content" rows="10" v-model="newArticle.content"></textarea>
        </div>
      </fieldset>

      <div class="col-lg-3 col-lg-offset-9">
        <button type="button"  class="btn btn-primary" @click="editArticle()">{{isUpdate()?'更新':'发布'}}文章</button>
        </div>
    </form>
</div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  computed: mapState({
      newArticle: state=> state.articleCurrent,
      featureList: state=> state.featureList
  }),
  methods:{
    isUpdate:function(){
      return this.$store.state.isArticleUpdate;
    },
    editArticle:function(){
      if (this.isUpdate()){
        console.log('更新文章');
        this.$store.dispatch('updateArticle', this.newArticle);
      } 
      else
      {
        this.$store.dispatch('addArticle', this.newArticle);
      }
      console.log(JSON.stringify(this.newArticle));
    }
  }
}
 </script>