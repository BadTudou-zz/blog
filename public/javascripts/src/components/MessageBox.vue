<template>
<div class=" col-lg-12" style="background-color: #123">
sfsdfsdf
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
          <span class="sr-only">Close</span>
        </button>
        <h4 class="modal-title">消息框</h4>
      </div>
      <div class="modal-body">
        <p><strong>{{msgTextType}}!</strong>{{msgText}}</p>
      </div>
	</div>
  </div>
</div>
</template>
<script>
// export default {
//  	data () {
//  		return {
//  			tips: {success:{type:'alert alert-success',	text:'成功'},
//  					err: 	 {type:'alert alert-danger',	text:'失败'},
//  					warn:  {type:'alert alert-warning',   text:'警告'},
//  					info:  {type:'alert alert-info',	 	text:'信息'}
//  				 }
//  		}
//  	},
//  	methods: {
//  		msgType:function(){
//  			return this.$store.state.msgType;
//  		},
//       msgClassType: function() {
//       	return this.tips[this.msgType].type;
//       },
//       msgTextType: function(){
//       	return this.tips[this.msgType].text;
//       },
//       msgText:function() {
//       	return this.$store.state.msgText;
//       }, 
//       isShow:function() {
//       	//return this.$store.state.msgboxIsShow;
//       	return true;
//       }
//  	}
//  }	
</script>