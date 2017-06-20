
// Utility file to normalise custom configuration for tooling
// NOTE: This utility is meant only for Webpack tooling, not application code
// In app code '@config' should be imported directly

var _ = require('lodash')
var path = require('path')

// Get base custom project configuration values
var aliases = require('../src/config/config.aliases.js');
var values = require('../src/config/config.base.js');
var devValues = require('../src/config/config.dev.base.js');
if (process.env.NODE_ENV === 'development') {
	values = _.merge(values, devValues);
}

// Path helper
// FIXME: duplicated from webpack.base.conf.js
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}



// Base values
var treated = {

	// No action needed
	meta: Object.assign({}, values.meta),
	svgSpritePath: values.svgSpritePath,
	compileAppIcons: values.compileAppIcons,
	appIconPlatforms: values.appIconPlatforms,
	robotsTxt: values.robotsTxt,
	webAppManifest: values.webAppManifest,

	// Prefix some paths with src
	appIconSourceFile: resolve('src/' + values.appIconSourceFile),

	// Basics needed for tooling
	customAliases: {
		'vue$': 'vue/dist/vue.esm.js',
	}

};

// We use a separate plugin for favicons
treated.appIconPlatforms.favicons = false;

// SVGO wants its configuration values in a really weird format
// https://github.com/karify/external-svg-sprite-loader/blob/master/index.js
treated.svgo = {
	plugins: []
};
for (var key in values.svgo) {
	var item = {};
	item[key] = values.svgo[key];
	treated.svgo.plugins.push(item);
}

// Treat aliases with resolve helper and merge with other configuration
// This will do '@styles': resolve('src/styles')
for (var key in aliases) {
  treated.customAliases[key] = resolve(aliases[key]);
}



// Export final values
module.exports = treated;
