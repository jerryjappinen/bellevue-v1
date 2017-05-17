
// Configuration for vue-router
// NOTE: This is in a separate file, because pipeline has to already work for the imports
// NOTE: could maybe use `require.context` to make this more dynamic
import Hello from '@components/pages/Hello';
import PageSomething from '@components/pages/PageSomething';
import PageConsole from '@components/pages/PageConsole';

// Subviews within pages
import ConsoleComponents from '@components/console/ConsoleComponents';
import ConsoleConfiguration from '@components/console/ConsoleConfiguration';
import ConsoleModels from '@components/console/ConsoleModels';
import ConsolePlugins from '@components/console/ConsolePlugins';

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
			}

		]

	}

];
