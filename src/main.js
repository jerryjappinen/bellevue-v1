
// Magical vendor code
import 'es6-promise/auto';

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

// Our custom configuration
// FIXME: config should point to a config reader utility that can merge all configuration files. including local environment overrides÷
import config from '@config';

// Import Vue directives and components
// NOTE: could add mixins here as well
import directives from '@directives';
import components from '@components';
// import mixins from '@mixins';



// Vue plugins
// https://vuejs.org/v2/guide/plugins.html
// These are integrated libraries that generally deliver new functionality to Vue components (or other objects)
// Generally they inject new functionality (such as this.$route) or read new values from the view model definition (such as metaInfo)

// NOTE: plugins are NOT the same as directives. Directives add templating functionality and are imported in each component they are used in.

// HTTP service
import '@plugins/vue-http';

// Handling meta tags and <head> per component
import '@plugins/vue-meta';

// Throttled event callbacks that use requestAnimationFrame for more performant operations
import '@plugins/vue-throttle-event';

// Officially supported router
import VueRouter from '@plugins/vue-router';

// Global state management
import Vuex from '@plugins/vuex';



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
	router: VueRouter,
	store: Vuex

});
