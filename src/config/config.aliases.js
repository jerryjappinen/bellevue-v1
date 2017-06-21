
// Aliases usable in codebase when doing imports and resolving URLs. From project root.
// NOTE: unlike other configuration files, this is needed by the low-level tooling scripts BEFORE any aliases have been defined and full URL resolution is working (since those aliases are defined here, duh). That's why this is split from other configuration files.
module.exports = {

	// src root
	// NOTE: prefer the other aliases over
	'@': 'src',

	// The base configuration (alias is mostly for the client)
	// NOTE: for client-side code it would be better to use a JS utility that reads configuration (merging values from multiple sources) instead of using these raw values in application code
	'@config': 'src/config',
	'@locales': 'src/locales',

	// Vendor code, services, utilities etc.
	'@models': 'src/models',
	'@services': 'src/services',
	'@util': 'src/util',

	// Assets
	'@assets': 'src/assets',
	'@fonts': 'src/fonts',
	'@svg': 'src/svg',

	// Vue application code
	'@vue-components': 'src/components',
	'@vue-directives': 'src/vue/directives',
	'@vue-mixins': 'src/vue/mixins',
	'@vue-plugins': 'src/vue/plugins',

	// State management
	'@store': 'src/store',

	// Global styles
	// NOTE: we could split this further
	'@styles': 'src/styles',
	'@shared-styles': 'src/styles/shared',

	// Test cases
	'@spec': 'spec'

};
