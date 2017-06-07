
// vue-i18n: Internationalization for Vue
// http://kazupon.github.io/vue-i18n/en/installation.html
import Vue from 'vue';
import VueI18n from 'vue-i18n';

// Import route components for vue-router
import config from '@config';
import locales from '@locales';



// Autoload plugin
Vue.use(VueI18n);

// Provide options for the plugin constructor (see docs for details)
const options = {

	// Set default locale
	locale: config.defaultLocale,
	fallbackLocale: config.fallbackLocale,

	// Inject copy text, formats etc.
	messages: locales.messages,
	dateTimeFormats: locales.dateTimeFormats,
	numberFormats: locales.numberFormats

};

// Export a new plugin instance
export default new VueI18n(options);
