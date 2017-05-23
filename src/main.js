
// Magical vendor code
import 'es6-promise/auto';

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

// Our custom configuration
import config from '@config';

// Import Vue directives and components
// NOTE: could add mixins here as well
import directives from '@directives';
import components from '@components';
// import mixins from '@mixins';
import plugins from '@plugins';

// Set configuration options for Vue
Vue.config.productionTip = false;

// Register all directives and components on the top level
// The alternative is to declare specific directives or the child components in each component manually.
// This leads to a lot of boilerplate code that is easily out of date, and makes it impossible to use dynamic components.
for (var directive in directives) { Vue.directive(directive, directives[directive]); }
for (var component in components) { Vue.component(component, components[component]); }
// for (var mixin in mixins) { Vue.mixin(mixin, mixins[mixin]); }

/* eslint-disable no-new */
new Vue({

	// Define root component and where to inject it in index.html.ejs
	el: config.rootComponentParentSelector,
	template: '<' + config.rootComponentName + '></' + config.rootComponentName + '>',

	// NOTE: These specific plugins apparently require us to pass these objects to the root component...
	router: plugins.VueRouter,
	store: plugins.Vuex

});
