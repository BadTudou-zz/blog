<template>
<div class="modal fade  in" tabindex="-1" role="dialog"  aria-hidden="true" style="display: block;" v-show="isShow">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
          <span class="sr-only">Close</span>
        </button>
        <h4 class="modal-title" id="myLargeModalLabel">消息框</h4>
      </div>
      <div class="modal-body">
        <div :class="msgClassType" role="alert">
          <strong>{{msgTextType}}:!</strong>{{msgText}}
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
 	data () {
 		return {
 			tips: {success:{type:'alert alert-success',	text:'成功'},
 					    err: 	 {type:'alert alert-danger',	text:'失败'},
 					    warn:  {type:'alert alert-warning',   text:'警告'},
 					    info:  {type:'alert alert-info',	 	text:'信息'}
 				 }
 		}
 	},
  computed:{
    msgClassType: function() {
        var msgType = this.$store.state.msgType;
        return this.tips[msgType].type;
    },
    msgTextType: function(){
      var msgType = this.$store.state.msgType;
      return this.tips[msgType].text;
    },
    msgText:function() {
      return this.$store.state.msgText;
    },
    isShow:function() {
      return this.$store.state.msgboxIsShow;
    }    
 	}
}	
</script>