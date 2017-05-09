
// Base conf
var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

// Plugins
var SvgPlugin = require('external-svg-sprite-loader/lib/SvgStorePlugin');

// Path helper
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

// Load custom values from manifest
var customConfiguration = require('./custom-config.js');



// Apply configuration

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.css', '.scss'],
		alias: customConfiguration.customAliases
  },
	plugins: [
		new SvgPlugin()
	],
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },

      // NOTE: this was added manually, is this needed?
      {
        test: /\.css$/,
        loader: 'postcss-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.scss$/,
        loader: 'postcss-loader',
				options: {
					parser: 'scss',
					syntax: 'scss'
				},
        include: [resolve('src'), resolve('test')]
      },

			// SVG pipeline
			{
				test: /\.svg$/,
				use: [

					// https://github.com/kisenka/svg-sprite-loader
					{
						loader: 'external-svg-sprite-loader',
						options: {
							name: customConfiguration.svgSpritePath,
							iconName: '[name]',
							svgoOptions: customConfiguration.svgoOptions
						}
					}

				]
			},

      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
