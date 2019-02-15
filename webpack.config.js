const VueLoaderPlugin = require("vue-loader/lib/plugin");
const PreloadWebpackPlugin = require('preload-webpack-plugin');

module.exports = {
	mode: "development",
	entry: "src/main.js",
	output: {
		path: __dirname + "/public",
		filename: "[name].[chunkhash:8].js"
	},
	module: {
		rules: [
			{
				enforce: "pre",
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			},
			{
				test: /\.vue$/,
				exclude: /node_modules/,
				use: "vue-loader"
			},
			{
				test: /\.scss$/,
				use: ["style-loader", "css-loader", "sass-loader"]
			}
		]
	},
	vue: {
		postcss: [
			require('autoprefixer')(),
		]
	},
	plugins: [
		// make sure to include the plugin!
		new VueLoaderPlugin(),
		new PreloadWebpackPlugin()
	]
};
