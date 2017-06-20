
// Adds new routes in addition to the defaults
import components from '@vue-components';

export default [

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
