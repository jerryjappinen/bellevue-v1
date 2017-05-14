
var path = require('path')

// Treat elements from custom project configuration
var values = require('../src/config.js');

// Path helper
// FIXME: duplicated from webpack.base.conf.js
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}





// Base values
var treated = {

	// No action needed
	meta: Object.assign({}, values.meta),
	svgoOptions: Object.assign({}, values.svgo),
	svgSpritePath: values.svgSpritePath,

	// Prefix some paths with src
	appIconSourceFile: resolve('src/' + values.appIconSourceFile),

	// Basics needed for tooling
	customAliases: {
		'vue$': 'vue/dist/vue.esm.js',
	}

};

// Treat aliases with resolve helper
// This will do '@styles': resolve('src/styles')
for (var key in values.aliases) {
  treated.customAliases[key] = resolve(values.aliases[key]);
}



// Export final values
module.exports = treated;
