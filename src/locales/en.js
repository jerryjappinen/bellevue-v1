
export default {

	// Titlebar titles
	// NOTE: each named route should have a corresponding title here
	titlebar: {

		// Top-level pages
		hello: 'Hello!',
		arbitrary: 'Some page',
		console: 'Console',

		// Console sub pages
		consoleComponents: '@:titlebar.console',
		consoleConfiguration: '@:titlebar.console',
		consoleModels: '@:titlebar.console',
		consolePlugins: '@:titlebar.console',
		consoleServices: '@:titlebar.console'

	}

};
