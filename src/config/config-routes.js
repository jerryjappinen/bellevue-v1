
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
		path: '/',
		name: 'root',

		// NOTE
		// - We could just display the Hello component with this route
		// - But in this case the router will think all top-level pages are children of that
		// - We also generally don't want more than one route for the same page
		// - So to allow users to use index paths, it's better to redirect to the default child page
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
	},

	{
		path: '/console',
		name: 'console',
		component: components.PageConsole,

		// Redirecting to the default child page
		redirect: {
			name: 'consoleComponents'
		},

		// https://router.vuejs.org/en/essentials/nested-routes.html
		children: [

			{
				path: 'components',
				name: 'consoleComponents',
				component: components.ConsoleComponents
			},

			{
				path: 'configuration',
				name: 'consoleConfiguration',
				component: components.ConsoleConfiguration
			},

			{
				path: 'models',
				name: 'consoleModels',
				component: components.ConsoleModels
			},

			{
				path: 'plugins',
				name: 'consolePlugins',
				component: components.ConsolePlugins
			},

			{
				path: 'services',
				name: 'consoleServices',
				component: components.ConsoleServices
			},

			{
				path: 'vuex',
				name: 'consoleVuex',
				component: components.ConsoleVuex
			}

		]

	}

];
