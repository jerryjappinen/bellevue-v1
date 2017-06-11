
export default {

	// Titlebar titles
	// NOTE: each named route should have a corresponding title here
	pageTitles: {

		// Top-level pages
		home: 'Hello!',
		arbitrary: 'Some page',
		console: 'Console',

		// Console sub pages
		consoleComponents: '@:pageTitles.console',
		consoleConfiguration: '@:pageTitles.console',
		consoleModels: '@:pageTitles.console',
		consolePlugins: '@:pageTitles.console',
		consoleServices: '@:pageTitles.console',
		consoleVuex: '@:pageTitles.console'

	}

};