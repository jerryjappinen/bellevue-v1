
// This is our custom project configuration
// Any configuration items that you expect people to be aware of and edit should be included here.
// The tooling pipeline will import these settings where appropriate so devs don't have to touch the actual files and potentially cause errors.

module.exports = {

	meta: {

		// Will be used in HTML template
		title: 'My app'

	},

	// Aliases usable in codebase when doing imports and resolving URLs. From project root.
	//
	// Used in:
	// - config/webpack.base.conf.js
	aliases: {
		'@': 'src',
		'@assets': 'src/assets',
		'@svg': 'src/svg',
		'@components': 'src/components',
		'@styles': 'src/styles',
		'@vueplugins': 'src/plugins',
		'@vuedirectives': 'src/directives'
	},

	svgSpritePath: 'sprite.svg',

	svgo: {
		removeTitle: true
	}

}
