
// The officially supported router
// https://router.vuejs.org/en/
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// Import route components for vue-router
import config from '@config';



// Router options
// See https://router.vuejs.org/en/api/options.html
export const options = {

	// Class names used by <router-link>
	// NOTE: these should conform to our class naming conventions
	linkActiveClass: config.router.linkActiveClass,
	linkExactActiveClass: config.router.linkExactActiveClass,

	// Our frontend URL scheme
	routes: config.routes

};

export default new Router(options);
