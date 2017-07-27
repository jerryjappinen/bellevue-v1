
export default {

	// Titlebar titles
	// NOTE: each named route should have a corresponding title here
	pageTitles: {

		// Top-level pages
		home: 'Home',
		posts: 'Posts',
		post: '@:pageTitles.posts',

		// Console sub pages
		console: 'Console',
		consoleComponents: '@:pageTitles.console',
		consoleConfiguration: '@:pageTitles.console',
		consoleModels: '@:pageTitles.console',
		consolePlugins: '@:pageTitles.console',
		consoleServices: '@:pageTitles.console',
		consoleVuex: '@:pageTitles.console'

	}

};
