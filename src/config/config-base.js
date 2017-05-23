
// This is our custom project configuration
// Any configuration items that you expect people to be aware of and edit should be included here.
// The tooling pipeline will import these settings where appropriate so devs don't have to touch the actual files and potentially cause errors.

// NOTE: the pipeline will break if we use ES6 export here, so let's stick to module.exports
module.exports = {

	// Set the root component and where to inject it
	rootComponentName: 'app',
	rootComponentParentSelector: '#app',

	// Will be used in base HTML templating
	meta: {
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
	// FIXME: no support for platform-specific source files yet
	appIconSourceFile: 'app-icon/app-icon.png',

	// This filename will be used for the sprite file that is generated from source SVG files
	svgSpritePath: 'sprite.svg',

	// SVGO plugins and plugin configuration options to use (in addition/instead of the defaults)
	svgo: {
		removeTitle: true,
		convertColors: {
			names2hex: true,
			rgb2hex: true,
			shorthex: true,
			shortname: true,

			// Convert this color code in fills/strokes/etc. to currentColor (used to generate mono-capable assets)
			// NOTE: must be exact, case-sensitive match before any other conversions
			// Assets must be authored with this in mind
			// https://github.com/svg/svgo/blob/master/plugins/_collections.js#L2527
			// https://github.com/svg/svgo/blob/master/plugins/convertColors.js#L61
			currentColor: '#FF00FF'

		}
	}

};
