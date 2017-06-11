
// en.js includes documentation for all keys

export default {

	pageTitles: {
		home: '¡Hola!',
		arbitrary: 'Una pagina',
		console: 'Consolas',

		// NOTE
		// - I'd like to not have to replicate this
		// - But it seems that if they're missing, vue-i18n will jump to fallback language and won't follow the key mapping back to this language
		consoleComponents: '@:titlebar.console',
		consoleConfiguration: '@:titlebar.console',
		consoleModels: '@:titlebar.console',
		consolePlugins: '@:titlebar.console',
		consoleServices: '@:titlebar.console'

	}

};
