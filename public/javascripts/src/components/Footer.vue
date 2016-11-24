<template>
<div id="div-footer" class="col-lg-12">
	<div id="div-footer--copyright">
		Copyright © 2016 {{domain}}. All rights reserved.<br/>
	</div>
	<div id="div-footer--ICP">
		{{icp}}				
	</div>
</div>
</template>
<style type="text/css">
#div-footer--copyright
{
	height: 40px; padding-top: 5px; background-color: #0099F0;  color:#FFF;
	font-size: 150%; font-weight: bold; text-align: center;
}
#div-footer--ICP
{
	text-align: center;
}
</style>
<script>
import { mapState } from 'vuex';
export default {
  computed: mapState({
      domain: state=> state.conf.website.domain,
      icp:state=> state.conf.website.ICP
   })
}
</script>