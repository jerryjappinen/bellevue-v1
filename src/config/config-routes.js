
// Configuration for vue-router
// NOTE: This is in a separate file, because pipeline has to already work for the imports
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
		component: PageConsole,

		// https://router.vuejs.org/en/essentials/nested-routes.html
		children: [

			{
				path: '',
				name: 'console',
				component: ConsoleComponents
			},

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
