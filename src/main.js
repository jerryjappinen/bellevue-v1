
// Magical vendor code
import 'es6-promise/auto';

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import _ from 'lodash';
import Vue from 'vue';

// Set configuration options for Vue
Vue.config.productionTip = false;



// Our custom configuration
import config from '@config';

// Import Vue directives and components
// NOTE: could add mixins here as well
import directives from '@directives';
import components from '@components';
import { global as globalMixins } from '@mixins';

// Some of plugins autoload, some are injected below
import plugins from '@plugins';

// Register all directives and components on the top level
// The alternative is to declare specific directives or the child components in each component manually.
// This would lead to a lot of boilerplate code that easily gets out of date, and makes it impossible to use dynamic components.
(function (registrees) {
	for (var type in registrees) {
		for (var key in registrees[type]) {

			// Vue.directive(directiveName, directives[directive])
			// Vue.component(componentName, components[component])
			Vue[type](_.kebabCase(key), registrees[type][key]);

		}
	}
})({
	directive: directives,
	component: components
});

// Register global mixins
(function (mixins) {
	for (var key in mixins) {
		Vue.mixin(mixins[key]);
	}
})(globalMixins);


/* eslint-disable no-new */
new Vue({

	// Define root component and where to inject it in index.html.ejs
	el: config.rootComponentParentSelector,
	template: '<' + config.rootComponentName + '></' + config.rootComponentName + '>',

	// NOTE: These specific plugins apparently require us to pass these objects to the root component...
	router: plugins.VueRouter,
	store: plugins.Vuex

});
