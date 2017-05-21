
// Base conf
var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

// Plugins
var SvgPlugin = require('external-svg-sprite-loader/lib/SvgStorePlugin')
var FaviconsWebpackPlugin = require('favicons-webpack-plugin')

// Path helper
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

// Load custom values from manifest
var customConfiguration = require('./custom-config.js')

// FIXME: htmllinter-loader has some issues, but we should include it here
// var htmllintOptions = {
// 	config: resolve('src/.htmllintrc')
// };



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
		new SvgPlugin(),
		// new FaviconsWebpackPlugin({
		// 	logo: customConfiguration.appIconSourceFile,
		// 	prefix: 'app-icons/[hash]/',
		// 	persistentCache: true,
		// 	title: customConfiguration.meta.title,
		// 	icons: {
		// 		android: true,
		// 		appleIcon: true,
		// 		appleStartup: true,
		// 		coast: false,
		// 		favicons: true,
		// 		firefox: true,
		// 		opengraph: false,
		// 		twitter: false,
		// 		yandex: false,
		// 		windows: false
		// 	}
		// }),
		new webpack.ProvidePlugin({
        _: 'underscore'
    })
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
      // {
      //   test: /\.vue$/,
      //   loader: 'htmllint-loader',
      //   enforce: 'pre',
      //   options: htmllintOptions,
      //   include: [resolve('src'), resolve('test')]
      // },
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

      // htmllinting
      // {
      //   test: /\.html$/,
      //   loader: 'htmllint-loader',
      //   enforce: 'pre',
			// 	options: htmllintOptions,
      //   include: [resolve('src'), resolve('test')]
      // },

			// SVG pipeline
			{
				test: /\.svg$/,
				use: [

					// https://www.npmjs.com/package/external-svg-sprite-loader
					{
						loader: 'external-svg-sprite-loader',
						options: {
							name: customConfiguration.svgSpritePath,
							iconName: '[name]',
							svgoOptions: customConfiguration.svgo
						}
					}

				]
			},

			// Independent EJS template files
      {
        test: /\.ejs$/,
        loader: 'ejs-loader',
        include: [resolve('src'), resolve('test')]
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
