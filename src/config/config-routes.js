
// Configuration for vue-router
// NOTE: This is in a separate file, because pipeline has to be already running with aliases for the imports to work
// NOTE: could maybe use `require.context` to make this more dynamic
import {
	Hello,
	PageSomething,
	PageConsole,
	ConsoleComponents,
	ConsoleConfiguration,
	ConsoleModels,
	ConsolePlugins,
	ConsoleServices
} from '@components';

export default [

	{
		path: '/',
		name: 'home',

		// NOTE
		// - We could just display the Hello component with this route
		// - But in this case the router will think all top-level pages are children of that
		// - We also generally don't want more than one route for the same page
		// - So to allow users to use index paths, it's better to redirect to the default child page
		redirect: {
			name: 'hello'
		}

	},

	{
		path: '/hello',
		name: 'hello',
		component: Hello
	},

	{
		path: '/arbit',
		name: 'arbitrary',
		component: PageSomething
	},

	{
		path: '/console',
		name: 'console',
		component: PageConsole,

		// Redirecting to the default child page
		redirect: {
			name: 'consoleComponents'
		},

		// https://router.vuejs.org/en/essentials/nested-routes.html
		children: [

			{
				path: 'components',
				name: 'consoleComponents',
				component: ConsoleComponents
			},

			{
				path: 'configuration',
				name: 'consoleConfiguration',
				component: ConsoleConfiguration
			},

			{
				path: 'models',
				name: 'consoleModels',
				component: ConsoleModels
			},

			{
				path: 'plugins',
				name: 'consolePlugins',
				component: ConsolePlugins
			},

			{
				path: 'services',
				name: 'consoleServices',
				component: ConsoleServices
			}

		]

	}

];
