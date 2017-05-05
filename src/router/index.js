import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);



// Pages
import Hello from '@components/pages/Hello';
import PageSomething from '@components/pages/PageSomething';

// Router options
// See https://router.vuejs.org/en/api/options.html
export const options = {

	// Class names used by <router-link>
	// NOTE: these should conform to our class naming conventions
	linkActiveClass: 'is-active',
	linkExactActiveClass: 'is-exact-active',

	// Our frontend URL scheme
	routes: [
		{
			path: '/',
			name: 'hello',
			component: Hello
		},
		{
			path: '/arbitrary',
			name: 'pageSomething',
			component: PageSomething
		}
	]

};

export default new Router(options);
