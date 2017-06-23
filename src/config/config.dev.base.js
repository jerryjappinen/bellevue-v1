
// Override base config values when in dev environment
module.exports = {

	meta: {
		// title: 'My app DEV'
	},

	// Turn off caching features for dev
	//
	// NOTE
	// There is a minor issue that might manifest itself if you change this:
	// https://github.com/Eiskis/bellevue/issues/28
	offlineCache: {
		enabled: false
	},

	paths: {
		// api: 'http://localhost:3333'
	}

};
