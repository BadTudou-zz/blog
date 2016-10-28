module.exports = {
	entry:'./src/index.js',
	output:{
		path:'./bin',
		filename:'index.bundle.js'
	},
	module:{
		loaders:[
			{test:/\.css$/, loader:"style!css"},
			{test: /\.js$/, loader: 'babel', exclude: /node_modules/},
			{test: /\.vue$/,loader: 'vue'}]
	},
	resolve: {
 		 alias: {
    		'vue$': 'vue/dist/vue.js'
  			}
		},
	vue: {
 		loaders: {
 			js: 'babel'
 		}
 	}
};