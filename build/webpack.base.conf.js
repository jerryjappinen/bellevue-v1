
// Base conf
var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var customConfiguration = require('../project.config.js');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}



// Treat elements from custom project configuration

// Aliases
var customAliases = {
  'vue$': 'vue/dist/vue.esm.js',
};
for (var key in customConfiguration.aliases) {

  // Something like '@styles': resolve('src/styles'),
  customAliases[key] = resolve(customConfiguration.aliases[key]);

}



// Actual configuration

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
    extensions: ['.js', '.vue', '.json', '.scss'],

    // NOTE: these values come from custom configuration
		alias: customAliases

  },
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
        loader: 'postcss-loader?parser=scss',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
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
