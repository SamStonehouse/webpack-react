const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const BUILD_DIR = path.resolve(__dirname, 'dist');
const SOURCE_DIR = path.resolve(__dirname, 'source');

const config = {
	entry: path.join(SOURCE_DIR, 'scripts', 'index.js'),
	output: {
		path: path.join(BUILD_DIR, 'assets'),
		filename: 'bundle.js',
		publicPath: 'assets/',
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					{ loader: MiniCssExtractPlugin.loader },
					{ loader: "css-loader" },
					{ loader: "sass-loader" },
					{ loader: "postcss-loader" },
				],
			},
			{
				enforce: 'pre',
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'eslint-loader',
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			}
		],
	},
	plugins: [
		new WriteFilePlugin(),
		new MiniCssExtractPlugin({
			filename: "styles.css",
		}),
		new CopyWebpackPlugin([
			{
				from: path.join(SOURCE_DIR, 'html'),
				to: BUILD_DIR,
			},
			{
				from: path.join(SOURCE_DIR, 'assets'),
				to: path.join(BUILD_DIR, 'assets'),
			},
		]),
	],
	devServer: {
		compress: true,
		port: 8080,
		contentBase: BUILD_DIR,
		publicPath: BUILD_DIR,
		quiet: false,
		noInfo: false,
		stats: {
			assets: false,
			children: false,
			chunks: false,
			chunkModules: false,
			colors: true,
			entrypoints: false,
			hash: false,
			modules: false,
			timings: false,
			version: false,
		},
	},
	devtool: "inline-cheap-module-source-map"
};

module.exports = config;