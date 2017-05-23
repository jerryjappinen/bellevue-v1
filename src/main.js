
// Vendor
import _ from 'lodash';

// Polyfills etc. magic
import 'es6-promise/auto';

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

// Set configuration options for Vue
Vue.config.productionTip = false;



// Register all directives and components on the top level
// The alternative is to declare specific directives or the child components in each component manually.
// This would lead to a lot of boilerplate code that easily gets out of date, and makes it impossible to use dynamic components.

import directives from '@directives';
import components from '@components';

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

import { global as globalMixins } from '@mixins';

(function (mixins) {
	for (var key in mixins) {
		Vue.mixin(mixins[key]);
	}
})(globalMixins);



// Some of these plugins load themselves automatically, some are injected below
import plugins from '@plugins';

// Our custom configuration
import config from '@config';



/* eslint-disable no-new */
new Vue({

	// Define root component and where to inject it in index.html.ejs
	el: config.rootComponentParentSelector, // Something like '#app'
	template: '<' + config.rootComponentName + '></' + config.rootComponentName + '>', // Something like '<app></app>'

	// NOTE: These specific plugins apparently require us to pass these objects to the root component...
	router: plugins.VueRouter,
	store: plugins.Vuex

});
