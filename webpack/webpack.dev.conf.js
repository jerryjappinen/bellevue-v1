var utils = require('./utils')
var webpack = require('webpack')
var config = require('./env')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var StylelintPlugin = require('stylelint-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
	baseWebpackConfig.entry[name] = ['./webpack/dev-client'].concat(baseWebpackConfig.entry[name])
})

// Load custom values from manifest
var customConfiguration = require('./custom-config.js');

module.exports = merge(baseWebpackConfig, {
	module: {
		rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
	},
	// cheap-module-eval-source-map is faster for development
	devtool: '#cheap-module-eval-source-map',
	plugins: [
		new webpack.DefinePlugin({
			'process.env': config.dev.env
		}),
		// https://github.com/glenjamin/webpack-hot-middleware#installation--usage
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		// https://github.com/ampedandwired/html-webpack-plugin
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'src/index.html.ejs',
			inject: true,
			title: customConfiguration.meta.title,
			favicon: 'src/assets/logo.png'
		}),
		new StylelintPlugin({
			emitErrors: false,
			// context: 'src',
			syntax: 'scss',
			files: ['src/**/*.{vue,scss}']
		}),
		new FriendlyErrorsPlugin()
	]
})
