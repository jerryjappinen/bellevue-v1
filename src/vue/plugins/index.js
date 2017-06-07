
// Vue plugins
// https://vuejs.org/v2/guide/plugins.html

// NOTE:
// - These are integrated libraries that generally deliver new functionality to Vue components (or other objects)
// - Generally they inject new functionality (such as this.$route) or read new values from the view model definition (such as metaInfo)
// - When adding plugins, you need to look up the documentation for each to understand the correct way of loading them
// - Each plugin is loaded in it's own file that can also import configuration from src/config/

import VueHttp from './vue-http';
import VueI18n from './vue-i18n';
import VueMeta from './vue-meta';
import VueThrottleEvent from './vue-throttle-event';
import VueRouter from './vue-router';
import Vuex from './vuex';

export {
	VueHttp,
	VueI18n,
	VueMeta,
	VueThrottleEvent,
	VueRouter,
	Vuex
};

export default {
	VueHttp,
	VueI18n,
	VueMeta,
	VueThrottleEvent,
	VueRouter,
	Vuex
};
