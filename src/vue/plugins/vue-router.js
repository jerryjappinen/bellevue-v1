
// The officially supported router
// https://router.vuejs.org/en/
import Vue from 'vue';
import Router from 'vue-router';

// Import route components for vue-router
import config from '@config';

// eslint-disable-next-line import/extensions
import defaultRoutes from '@config/config.routes';

// eslint-disable-next-line import/extensions
import devRoutes from '@config/config.dev.routes';

// Merge configs with multiple sources
let mergedRoutes = defaultRoutes;

if (process.env.NODE_ENV === 'development') {
	mergedRoutes = mergedRoutes.concat(devRoutes);
}

// Autoload plugin
Vue.use(Router);

// Set up router options
export const options = {

	// Class names used by <router-link>
	// NOTE: these should conform to our class naming conventions
	linkActiveClass: config.router.linkActiveClass,
	linkExactActiveClass: config.router.linkExactActiveClass,

	// Our frontend URL scheme
	routes: mergedRoutes

};

// Export a new plugin instance
export default new Router(options);
