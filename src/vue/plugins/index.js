
// Vue plugins
// https://vuejs.org/v2/guide/plugins.html
// https://eiskis.gitbooks.io/bellevue/app/vue.html

// NOTE:
// - These are integrated libraries that generally deliver new functionality to Vue components (or other objects)
// - Generally they inject new functionality (such as this.$route) or read new values from the view model definition (such as metaInfo)
// - When adding plugins, you need to look up the documentation for each to understand the correct way of loading them
// - Each plugin is loaded via a separate file. You can import configuration from '@config' in each file.
// - See documentation for more info on how to load various plugins.

import VueI18n from './vue-i18n';
import VueMeta from './vue-meta';
import VueRouter from './vue-router';
import Vuex from './vuex';

export {
	VueI18n,
	VueMeta,
	VueRouter,
	Vuex
};

export default {
	VueI18n,
	VueMeta,
	VueRouter,
	Vuex
};
