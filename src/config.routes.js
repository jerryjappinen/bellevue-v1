
// Configuration for vue-router
// NOTE: This is in a separate file, because pipeline has to already work for the imports
// NOTE: could maybe use `require.context` to make this more dynamic
import Hello from '@components/pages/Hello';
import PageSomething from '@components/pages/PageSomething';

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
	}

];
