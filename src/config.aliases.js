
// Aliases usable in codebase when doing imports and resolving URLs. From project root.

module.exports = {

	// src root
	// NOTE: prefer the other aliases over
	'@': 'src',

	// The base configuration (alias is mostly for the client)
	// NOTE: for client-side code it would be better to use a JS utility that reads configuration (merging values from multiple sources) instead of using these raw values in application code
	'@config': 'src/config.base.js',

	// Vendor code and utilities
	// NOTE: do we need to separate between @vendor and @util?
	'@vendor': 'src/vendor',

	// Assets
	'@assets': 'src/assets',
	'@fonts': 'src/fonts',
	'@svg': 'src/svg',

	// Application code
	'@models': 'src/vue-models',
	'@components': 'src/vue-components',
	'@directives': 'src/vue-directives',
	'@plugins': 'src/vue-plugins',

	// State management
	'@store': 'src/vuex-store',

	// Global styles
	// NOTE: we could split this further
	'@styles': 'src/styles'

};
