var utils = require('./utils')
var webpack = require('webpack')
var config = require('./env')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var StylelintPlugin = require('stylelint-webpack-plugin')
var FaviconsWebpackPlugin = require('favicons-webpack-plugin')

var _ = require('lodash')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
	baseWebpackConfig.entry[name] = ['./tooling/dev-client'].concat(baseWebpackConfig.entry[name])
})

// Load custom values from manifest
var normalizedConfig = require('./custom-config.js');
var configForTemplate = require('../src/config/config.base.js');
var devValues = require('../src/config/config.dev.base.js');
configForTemplate = _.merge(configForTemplate, devValues);

var webpackConfig = merge(baseWebpackConfig, {
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
			title: normalizedConfig.meta.title,
			favicon: 'src/app-icon/favicon.png',
			config: configForTemplate
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

if (normalizedConfig.compileAppIcons.dev) {
	webpackConfig.plugins.push(
		new FaviconsWebpackPlugin({
			logo: normalizedConfig.appIconSourceFile,
			prefix: 'app-icons/[hash]/',
			persistentCache: true,
			title: normalizedConfig.meta.title,
			icons: normalizedConfig.appIconPlatforms
		}),
	)
}

module.exports = webpackConfig
