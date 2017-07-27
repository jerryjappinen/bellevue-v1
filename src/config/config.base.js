
// This is our custom project configuration
// Any configuration items that you expect people to be aware of and edit should be included here.
// Webpack config files will import these settings where appropriate so devs don't have to touch the actual files and potentially cause errors.

// NOTE: tooling will break if we use ES6 export here, so let's stick to module.exports
module.exports = {

	// Will be used in base HTML templating
	meta: {
		title: 'Bellevue app',
		description: 'Description about what this app does',

		// https://developers.google.com/web/fundamentals/design-and-ui/browser-customization/
		themeColor: '#00baf8',

		// https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html
		iosStatusBarStyle: 'default'

	},

	// https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
	// https://www.npmjs.com/package/webapp-manifest-plugin
	webAppManifest: {
		name: 'Bellevue app',
		shortName: 'Bellevue app',
		description: 'Description about what this app does',
		// dir: 'auto',
		lang: 'en-US',
		// display: 'standalone',
		// orientation: 'any',
		// startUrl: '/',
		backgroundColor: '#fff',
		themeColor: '#00baf8',
		// icons: [], // will be auto injected, you can leave this empty
		// preferRelatedApplications: false,
		relatedApplications: [
			// {
			// 	platform: 'play',
			// 	id: 'com.google.samples.apps.iosched'
			// }
		],
		scope: '/'
	},

	// This is a good place for configuring any miscellaneous paths you might have to work with
	paths: {},

	// Setting environment variables etc.
	env: 'production',
	currentRemote: 'production',

	// List of available remotes
	// NOTE: you can add multiple remotes here and select which one to use in currentRemote to develop against different backends
	remotes: {

		// Provide base path, and any other information you need
		// This is consumed in @models/Remote
		production: {
			path: 'https://jsonplaceholder.typicode.com/',
			api: '',
			login: 'login/',
			logout: 'logout/'
		}

	},

	// NOTE: not from Bellevue below this line

	// Anyone with access level at or higher than listed here can access route
	// 0 means anyone can access, even when not logged in

	routePermissionRoles: [
		'loggedUser' // 1
	],

	routePermissions: {

		// Root forwards to home, so make sure these two match
		'root': 0,
		'home': 0,

		// Sample pages
		'list': 0,
		'item': 0,

		// Sample page to demo route guards
		'secret': 1

	},

	// Localisation
	defaultLocale: 'en',
	fallbackLocale: 'en',

	// Link to native iOS app's App Store page
	appStore: {
		appId: '',
		affiliate: '',
		appArgument: ''
	},

	// Format detection meta tag for iOS
	// https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html
	formatDetection: {
		'telephone': 'yes'
	},

	// Links to static or externally hosted JS that need a script tag in index.html
	scriptLinks: [
		// '//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js',
		// '/static/vendor.js'
	],

	// Links to static or externally hosted CSS that need a style tag in index.html
	styleLinks: [
		// '//fonts.googleapis.com/css?family=Overpass',
		// '//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
		// '/static/vendor.css'
	],

	// List of URLs to add a prefetch meta tag for
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ
	prefetch: [],

	offlineCache: {

		// Set to false/true to disable/enable offline caching of production builds
		// Outputs appcache manifest and service workers that define how app assets should be cached by supported browsers
		enabled: false,

		// Whether serve assets to users from cache or via network first when both are available
		// 'cache-first' or 'network-first'
		responseStrategy: 'cache-first',

		// Either update all assets when the (internal) version has changed, or track individual asset versions separately
		// 'all' or 'changed'
		updateStrategy: 'all'

	},

	// Viewport control for mobile devices
	// https://developer.mozilla.org/en/docs/Mozilla/Mobile/Viewport_meta_tag
	// https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariWebContent/UsingtheViewport/UsingtheViewport.html
	// NOTE: keys must be in kebab-case
	viewport: {
		'width': 'device-width',
		'height': null,
		'initial-scale': 1,
		'minimum-scale': null,
		'maximum-scale': 1,
		'user-scalable': 'no'
	},

	// robots.txt
	// https://github.com/itgalaxy/generate-robotstxt
	// http://www.robotstxt.org
	robotsTxt: {
		// sitemap: 'sitemap.xml',
		// host: 'http://example.com',
		policy: [
			// {
			// 	userAgent: '*',
			// 	allow: '/',
			// 	disallow: '/foo',
			// 	crawlDelay: 10,
			// 	cleanParam: 'ref /foo/'
			// }
		]
	},

	// http://www.robotstxt.org/meta.html
	robotsMeta: [
		// 'index',
		// 'noindex',
		// 'follow',
		// 'nofollow'
	],

	// See docs at https://router.vuejs.org/en/api/options.html
	router: {

		// 'hash': extra hash characters in URLs, no server configuration needed for routing to work
		// 'history': no extra characters in URLs, but requires server configuration
		mode: 'hash',

		// Class names used by <router-link>
		// NOTE: these should conform to our class naming conventions
		linkActiveClass: 'is-active',
		linkExactActiveClass: 'is-exact-active'

	},

	// You can disable compiling app icons here, per environment, to speed up compilation
	// https://github.com/jantimon/favicons-webpack-plugin
	//
	// FIXME
	// There are two issues related to these when enabled
	// - https://github.com/Eiskis/bellevue/issues/12
	// - https://github.com/Eiskis/bellevue/issues/22
	compileAppIcons: {
		dev: false,
		prod: false
	},
	appIconPlatforms: {
		android: true, // will be also used for web app manifest
		appleIcon: true,
		appleStartup: false, // Not a good idea to generate these from the same source file
		coast: false,
		favicons: true,
		firefox: false,
		opengraph: false,
		twitter: false,
		yandex: false,
		windows: true
	},

	// Enable some meta tags that optimize the mobile experience
	mobile: true,
	defaultTouchHighlight: false,

	// Webpack will generate app icons for all platforms based on this
	// FIXME: no support for platform-specific source files yet
	appIconSourceFile: 'app-icon/app-icon.png',

	// https://github.com/declandewet/vue-meta#options
	metaInfo: {

		// the component option name that vue-meta looks for meta info on
		keyName: 'metaInfo',

		// the attribute name vue-meta adds to the tags it observes
		attribute: 'data-vue-meta',

		// the attribute name that lets vue-meta know that meta info has already been server-rendered
		ssrAttribute: 'data-vue-meta-server-rendered',

		// the property name that vue-meta uses to determine whether to overwrite or append a tag
		tagIDKeyName: 'vmid'

	},

	// Set the root component and where to inject it
	rootComponentName: 'app',
	rootComponentParentSelector: '#app',

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
