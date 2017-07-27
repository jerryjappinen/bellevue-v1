// Override base config values when in dev environment
module.exports = {
	env: 'development',

	// Don't develop against production
	currentRemote: 'staging',

	// Additional remotes useful for development
	remotes: {

		localhost: {
			path: 'https://localhost/',
			api: '',
			login: 'login/',
			logout: 'logout/'
		},

		staging: {
			path: 'https://jsonplaceholder.typicode.com/',
			api: '',
			login: 'login/',
			logout: 'logout/'
		}

	},

	meta: {
		// title: 'DEVELOPMENT MODE'
	},

	// Turn off caching features for dev
	//
	// NOTE
	// There is a minor issue that might manifest itself if you change this:
	// https://github.com/Eiskis/bellevue/issues/28
	offlineCache: {
		enabled: false
	},

	// These routes are for dev only
	routePermissions: {
		'console': 0,
		'consoleComponents': 0,
		'consoleConfiguration': 0,
		'consoleModels': 0,
		'consolePlugins': 0,
		'consoleServices': 0,
		'consoleVuex': 0
	}

};
