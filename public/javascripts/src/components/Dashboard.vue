<template>
<div id="div-manage--dashboard" v-show="isShow">
	<div class="col-lg-12">
		<div class="card col-lg-4" v-for="stateItem in blogState">
			<div class="row">
				<div class="col-lg-3" style="margin-top:10px;">
  					<a href="#"><i class="fa fa-3x" :class="stateItem.icon" :style="stateItem.style"staaria-hidden="true" ></i></a>
  				</div>
  				<div class="row text-center col-lg-8 col-lg-offset-1">
  					<div class="col-lg-12" style="margin-top: 10px; font-weight: bold; font-size: %200;">
  						{{stateItem.value}}
  					</div>
  					<div class="col-lg-12" style="margin-bottom: 10px; color:#AFBDCD; font-size:%150;">
  						{{stateItem.title}}
  					</div>
  				</div>
  			</div>
  		</div>
	</div>
  <div class="col-lg-offset-6 col-lg-6">
    <div class="btn-group" role="group btn-group-sm" aria-label="Basic example" style="font-size:%80">
      <button type="button" class="btn btn-secondary" @click="nearestDays(7)">近1周</button>
      <button type="button" class="btn btn-secondary" @click="nearestDays(30)">近1月</button>
      <button type="button" class="btn btn-secondary" @click="nearestDays(365)">近1年</button>
    </div>
  </div>
</div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  computed: mapState({
      blogState: state => state.blogState,
      isShow: state=> (state.parentNavItem.text == '管理') && (state.manageParentNavItem.text == '仪表盘'),
  }),
  methods:{
    nearestDays:function(days){
      this.$store.dispatch('getBlogState', days);
    }
  }
}
</script>