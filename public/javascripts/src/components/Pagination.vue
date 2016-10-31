<template>
<div class="col-lg-8 col-lg-offset-4" v-show="isShow">
    <nav>
  		<ul class="pagination">
    		<li :class="currentPage==1?'disabled':''">
    		  	<a href="#" aria-label="Previous" @click="previous">
    		  		<span aria-hidden="true">&laquo;</span>
    		  		<span class="sr-only">Previous</span>
    		  	</a>
    		</li>
    		<li v-bind:class="currentPage == number?'active':''" v-for="number in generateNumbers">
    		  	<a href="#" @click="goto(number)">{{number}}</a>
    		</li>
    		<li>
    		  	<a href="#" aria-label="Next" @click="next">
    		  		<span aria-hidden="true">&raquo;</span>
    		  		<span class="sr-only">Next</span>
    		  	</a>
    		</li>
    		<li>
    		  	<div class="input-group col-lg-3" style="margin-top: 2px;">
    		  		<input type="text" class="form-control" placeholder="页码" v-model="targetPage">
    		  			<span class="input-group-btn">
    		  				<button class="btn btn-secondary" type="button" @click="goto(targetPage)">页</button>
    		  			</span>
    		  	</div>
    		  </li>    	
  		</ul>
	</nav>
</div>
</template>
<script>
export default {
	data () {
 		return {
 			targetPage:''
 		}
 	},
 	props:['trigger', 'parentshow', 'childshow', 'current'],
 	computed:{
 		generateNumbers: function(){
            var numbers = [];
            for(var i = 0; i < 5; i++){
              numbers.push(Number(this.currentPage)+i);
            }
            return numbers;
        },
        currentPage:function(){
        	return this.$store.state[this.current];
        },
        isShow:function(){
        	return (this.$store.state.parentNavItem.text == this.parentshow && 
        		this.$store.state.childNavItem.text == this.childshow);
        }
   	},
 	methods:{
 		previous:function(){
 			this.$store.dispatch(this.trigger, this.currentPage-1);
 		},
 		next:function(){
 			this.$store.dispatch(this.trigger, this.currentPage+1);
 		},
 		goto:function(page){
 			this.$store.dispatch(this.trigger, page);
 			this.targetPage = '';
 		}
 	}
 }
</script>