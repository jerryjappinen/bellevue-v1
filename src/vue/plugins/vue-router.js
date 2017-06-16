
// The officially supported router
// https://router.vuejs.org/en/
import Vue from 'vue';
import Router from 'vue-router';

// Import route components for vue-router
import config from '@config';



// Autoload plugin
Vue.use(Router);

// Set up router options
export const options = {

	// Class names used by <router-link>
	// NOTE: these should conform to our class naming conventions
	linkActiveClass: config.router.linkActiveClass,
	linkExactActiveClass: config.router.linkExactActiveClass,

	// Our frontend URL scheme
	routes: config.routes

};

// Export a new plugin instance
export default new Router(options);
