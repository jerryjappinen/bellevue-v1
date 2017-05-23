
// The officially supported router
// https://router.vuejs.org/en/
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// Import route components for vue-router
import routes from '@/config.routes.js';



// Router options
// See https://router.vuejs.org/en/api/options.html
export const options = {

	// Class names used by <router-link>
	// NOTE: these should conform to our class naming conventions
	linkActiveClass: 'is-active',
	linkExactActiveClass: 'is-exact-active',

	// Our frontend URL scheme
	routes: routes

};

export default new Router(options);
