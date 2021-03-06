const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
	entry: "./src/index.js",
	mode: "development",
	devtool: "eval",
	output: {
		path: path.resolve(__dirname, "build"),
		publicPath: "/",
		filename: "bundle.js"
	},
	resolve: {
		extensions: [".js"]
	},
	devServer: {
		contentBase: path.resolve(__dirname, "build"),
		historyApiFallback: true,
		port: 8080
	},
	module: {
		rules: [
			{
				test: /\.js(x?)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "babel-loader"
					}
				]
			},
			{
				test: /\.svg$/,
				use: [
					{
						loader: "react-svg-loader"
					}
				]
			},
			{
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader"
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve("src/index.html")
		}),
		new Dotenv({
			path: path.resolve("src/.env")
		})
	]
};
