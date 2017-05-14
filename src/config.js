
// This is our custom project configuration
// Any configuration items that you expect people to be aware of and edit should be included here.
// The tooling pipeline will import these settings where appropriate so devs don't have to touch the actual files and potentially cause errors.

module.exports = {

	meta: {

		// Will be used in HTML template
		title: 'My app'

	},

	// https://github.com/declandewet/vue-meta#options
	metaConfig: {

		// the component option name that vue-meta looks for meta info on.
		keyName: 'metaInfo',

		// the attribute name vue-meta adds to the tags it observes
		attribute: 'data-vue-meta',

		// the attribute name that lets vue-meta know that meta info has already been server-rendered
		ssrAttribute: 'data-vue-meta-server-rendered',

		// the property name that vue-meta uses to determine whether to overwrite or append a tag
		tagIDKeyName: 'vmid'

	},

	// Webpack pipeline will generate app icons for all platforms based on this
	// FIXME: add platform-specific source files
	appIconSourceFile: 'app-icon/app-icon.png',

	// Aliases usable in codebase when doing imports and resolving URLs. From project root.
	//
	// Used in:
	// - config/webpack.base.conf.js
	aliases: {
		'@': 'src',
		'@assets': 'src/assets',
		'@fonts': 'src/fonts',
		'@svg': 'src/svg',
		'@components': 'src/components',
		'@directives': 'src/directives',
		'@store': 'src/store',
		'@plugins': 'src/plugins',
		'@styles': 'src/styles'
	},

	svgSpritePath: 'sprite.svg',

	svgo: {
		removeTitle: true
	}

};
