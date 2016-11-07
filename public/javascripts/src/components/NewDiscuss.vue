<template>
<div id="div-newdiscuss">
    <form>
       	<fieldset class="form-group">
            <div class="col-lg-4">
               	<label for="input-nickname">昵称</label>
                <input type="text" class="form-control" id="input-nickname" placeholder="昵称" v-model="newDiscuss.author">
            </div>
            <div class="col-lg-8">
                <label for="input-email">联系方式</label>
                <input type="email" class="form-control" id="input-email" placeholder="QQ/微信/电子邮箱" v-model="newDiscuss.contact">
            </div>
        </fieldset>
        <fieldset class="form-group">
            <div class="col-lg-12">
                <label for="input-discuss">评论</label>
                <textarea type="text" class="form-control" id="exampleInputEmail1" placeholder="让我们的思想自由恋爱吧！" rows="3" v-model="newDiscuss.content"></textarea>
            </div>
            <div class="col-lg-offset-9 col-lg-3">
                <button type="button" id="btn_add" class="btn btn-primary" @click="addDiscuss">发表评论</button>
            </div>
        </fieldset>
    </form>
</div>
</template>
<script>
export default {
 	data () {
 		return {
 			newDiscuss:{
 				author:'',
 				contact:'',
 				content:''
 			}
 		}
 	},
 	methods:{
 		addDiscuss: function(){
 			this.$store.dispatch('addArticleDiscuss',this.newDiscuss);
        }
 	}
}
</script>