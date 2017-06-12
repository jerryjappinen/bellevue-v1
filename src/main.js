
// Vendor
import _ from 'lodash';

// Polyfills etc. magic
import 'es6-promise/auto';

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

// Our custom configuration
import config from '@config';

// Some of these plugins load themselves automatically, some are injected below
import plugins from '@vue-plugins';

// Other Vue elements
import components from '@vue-components';
import directives from '@vue-directives';
import { global as globalMixins } from '@vue-mixins';

// Services
import services from '@services';



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



// Set configuration options for Vue
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({

	// Absolute basic options to initialize the app
	el: config.rootComponentParentSelector,
	template: '<' + config.rootComponentName + '></' + config.rootComponentName + '>',

	// NOTE: These specific plugins require us to pass these objects to the root component
	router: plugins.VueRouter,
	store: plugins.Vuex,
	i18n: plugins.VueI18n,

	// Using computed here let's us track the app state to enable high-level features
	computed: {
		serialized: {

			// Track the `serialized` property of each service
			get: function () {
				var serialized = {};

				// Collect serialized state data form each custom service
				for (var serviceName in services) {
					var service = services[serviceName];
					if (service.serialized) {
						serialized[serviceName] = service.serialized;
					}
				}

				return serialized;
			},

			// Allow passing the full batch of serialized service data and load it with the unserialization callback of each service
			// NOTE: the `serialized` property of each service must be a writable computed
			set: function (serialized) {

				// Call the serialized setter for each service
				for (var serviceName in services) {
					var service = services[serviceName];
					if (serialized[serviceName] && service.serialized) {
						service.serialized = serialized[serviceName];
					}
				}

			}

		}
	},

	watch: {

		// Store serialized data into localStorage when it changes (throttled)
		serialized: _.debounce(function (data) {
			localStorage.setItem('serializedServiceStateData', JSON.stringify(data));
		}, 500)

	},

	mounted: function () {

		// Load serialized data from localStorage
		// NOTE: this is a synchronous operation
		var data = localStorage.getItem('serializedServiceStateData');

		if (data) {
			try {
				data = JSON.parse(data);

				// We found data in local storage, let's load it up
				if (data) {
					this.serialized = data;
				}

			} catch (error) {
				console.log(error);
			}
		}

	}

});
