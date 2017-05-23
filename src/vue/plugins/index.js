
// Vue plugins
// https://vuejs.org/v2/guide/plugins.html
// These are integrated libraries that generally deliver new functionality to Vue components (or other objects)
// Generally they inject new functionality (such as this.$route) or read new values from the view model definition (such as metaInfo)



// HTTP service
import VueHttp from './vue-http';

// Handling meta tags and <head> per component
import VueMeta from './vue-meta';

// Throttled event callbacks that use requestAnimationFrame for more performant operations
import VueThrottleEvent from './vue-throttle-event';

// Officially supported router
import VueRouter from './vue-router';

// Global state management
import Vuex from './vuex';

export {
	VueHttp,
	VueMeta,
	VueThrottleEvent,
	VueRouter,
	Vuex
};

export default {
	VueHttp,
	VueMeta,
	VueThrottleEvent,
	VueRouter,
	Vuex
};
