<template>
<div id="div-articleedit"  class="col-lg-9" v-show="isShow">
    <form>
      <!-- 标题 -->
      <fieldset class="form-group">
        <div class="col-lg-4">
          <label for="input-title">标题</label>
          <input type="text" class="form-control" id="input-title" placeholder="标题" v-model="article.title">
        </div>
        <div class="col-lg-6">
          <label for="input-subtitle">副标题</label>
          <input type="text" class="form-control" id="input-subtitle" placeholder="副标题" v-model="article.subtitle" style="font-size: 80%">
        </div>
      </fieldset>

      <!-- 专题 -->
      <fieldset class="form-group">
        <div class="col-lg-4">
          <label for="select-feature">所属专题</label>
          <select class="form-control" id="select-feature" v-model="article.featureID">
            <option value="{{featureItem.id}}" v-for="featureItem in featureList">{{featureItem.title}}</option>
          </select>
        </div>

        <div class="col-lg-8">
          <label for="input-link">链接</label>
          <div class="input-group">
            <span class="input-group-addon">https://example.com/</span>
            <input type="text" class="form-control" id="input-link" placeholder="链接" v-model="article.link">
          </div>
        </div>
      </fieldset>

      <fieldset class="form-group">
        <div class="col-lg-12">
          <label for="input-coverLink">封面图片链接</label>
          <input type="text" class="form-control" id="input-coverLink" placeholder="封面图片链接" v-model="article.coverLink">
        </div>
      </fieldset>
      <!-- 作者 -->
      <fieldset class="form-group">
        <div class="col-lg-2">
          <label for="input-author">作者</label>
          <input type="text" class="form-control" id="input-author" placeholder="作者" v-model="article.author">
        </div>
      </fieldset>

      <!-- 简介 -->
      <fieldset class="form-group">
        <div class="col-lg-12">
          <label for="textarea-introduction">简介</label>
          <textarea class="form-control" id="textarea-introduction" rows="3" v-model="article.introduction"></textarea>
        </div>
      </fieldset>

      <fieldset class="form-group">
        <div class="col-lg-12">
          <label for="textarea-content">内容</label>
          <textarea class="form-control" id="textarea-content" rows="10" v-model="article.content"></textarea>
        </div>
      </fieldset>

      <div class="col-lg-3 col-lg-offset-3">
        <button type="button" id="btn_add" class="btn btn-primary" @click="done()">立即{{isEditAritcleMode?'更新':'发布'}}</button>
        </div>
    </form>
</div>
</template>
<script>
import { mapState } from 'vuex';

export default {
 	data () {
 		return {
 			article:{
 				id:'',
 				title:'',
 				subtitle:'',
 				featureID:'',
 				link:'',
 				coverLink:'',
 				author:'',
 				introduction:'',
 				content:''
 			}
 		}
 	},
 	computed: mapState({
      isEditAritcleMode: state => state.childNavItem.text == '编辑',
      isShow: state => ((state.parentNavItem.text == '文章') && ((state.childNavItem.text == '编辑'  || (state.childNavItem.text == '新建'))); 
  	})
 }