import Vue from 'vue';
import Router from 'vue-router';

// Pages
import Hello from '@/components/pages/Hello';
import PageSomething from '@/components/pages/PageSomething';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Hello',
			component: Hello
		},
		{
			path: '/arbitrary',
			name: 'PageSomething',
			component: PageSomething
		}
	]
});
