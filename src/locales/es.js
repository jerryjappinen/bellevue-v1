
// en.js includes documentation for all keys

export default {

	pageTitles: {
		home: '¡Hola!',
		arbitrary: 'Una pagina',
		console: 'Consolas',

		// NOTE
		// - I'd like to not have to replicate this
		// - But it seems that if they're missing, vue-i18n will jump to fallback language and won't follow the key mapping back to this language
		consoleComponents: '@:pageTitles.console',
		consoleConfiguration: '@:pageTitles.console',
		consoleModels: '@:pageTitles.console',
		consolePlugins: '@:pageTitles.console',
		consoleServices: '@:pageTitles.console',
		consoleVuex: '@:pageTitles.console'

	}

};
