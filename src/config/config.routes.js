
// Configuration for vue-router
// NOTE: This is in a separate file, because Webpack has to be already running with aliases for the imports to work
// NOTE: could maybe use `require.context` to make this more dynamic
import components from '@vue-components';

export default [

	{
		path: '*',
		name: 'notFound',
		component: components.PageNotFound
	},

	{
		// NOTE
		// - We could just display the home page component with this route
		// - But if we did, the router will think all top-level pages are children of that
		// - We also generally don't want more than one route for the same page
		// - So to allow users to use index paths, it's better to redirect to the default child page
		path: '/',
		name: 'root',
		redirect: {
			name: 'home'
		}
	},

	{
		path: '/home',
		name: 'home',
		component: components.PageHome
	},

	{
		path: '/arbit',
		name: 'arbitrary',
		component: components.PageSomething
	},

	{
		path: '/list',
		name: 'list',
		redirect: {
			name: 'listpage',
			params: {
				page: 1
			}
		}
	},

	{
		path: '/list/:page',
		name: 'listpage',
		component: components.PageList
	}

];
