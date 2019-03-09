
var path = require('path');  //引用node的path模块
var webpack = require("webpack");


module.exports = {
	// entry: "./src/index.js",  //规定webpack在 APP_PATH 的idnex.js 文件开始打包,
	entry: {
		usercenter: "./src/index.js"
	},
	output: {
		path: path.resolve(__dirname, 'build'),  //输出到那个文件夹
		filename: "[name].bundle.js" //输出到该文件夹的某个文件
	},
	module: {
		loaders: [
			{
				test: /\.js$/, //配置要处理的文件格式，一般使用正则表达式匹配
				loader: 'babel-loader', //使用的加载器名称
				exclude: /node_modules/,
				query: {                //babel的配置参数，可以写在.babelrc文件里也可以写在这里
					presets: ['env', 'react']   //{"presets": ["react", "env"]}
				}
			},
			{
				test: /\.jsx$/, //配置要处理的文件格式，一般使用正则表达式匹配
				loader: 'babel-loader', //使用的加载器名称
				exclude: /node_modules/,
				query: {                //babel的配置参数，可以写在.babelrc文件里也可以写在这里
					presets: ['env', 'react']   //{"presets": ["react", "env"]}
				}
			},
			{ test: /\.less$/, loader: "style-loader!css-loader!autoprefixer-loader!less-loader" },
			{ test: /\.css$/, loader: "style-loader!css-loader!autoprefixer-loader" },
			{ test: /\.png$/, loader: "url-loader?limit=100000" },
			{ test: /\.jpg$/, loader: "file-loader" },
			// **IMPORTANT** This is needed so that each bootstrap js file required by
			// bootstrap-webpack has access to the jQuery object
			//{ test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },

			// Needed for the css-loader when [bootstrap-webpack](https://github.com/bline/bootstrap-webpack)
			// loads bootstrap's css.
			{ test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: "url-loader?limit=10000&mimetype=application/font-woff" },
			{ test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,   loader: "url-loader?limit=10000&mimetype=application/font-woff2" },
			{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
			{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file-loader" },
			{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url-loader?limit=10000&mimetype=image/svg+xml" }
		]
	},
	plugins: [
		// CommonsChunkPlugin 能将公共的模块抽出到单独的 js，再由页面单独引用。参考 https://webpack.github.io/docs/optimization.html
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: ['vendor', 'usercenter'],
		// 	filename: '[name].bundle.js'
		// }),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery",
			"root.jQuery": "jquery"
		}),
		new webpack.DefinePlugin({
            TEMPLATE_PATH : JSON.stringify("/templates/AnGuang"),
            USER_CENTER_ASPX_PATH : JSON.stringify("/aspx/main/usercenter.aspx")
        })
	],
	devServer: {
		contentBase: "./build",//本地服务器所加载的页面所在的目录
		historyApiFallback: true,//不跳转
		inline: true,//实时刷新
		//hot: true
		port: 8081,
		proxy: {
			'/api': {
				target: 'http://localhost:8085/bpmx3',
				pathRewrite: { '^/api': '' }
			}
		}
	}
};