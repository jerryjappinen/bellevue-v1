
// Magical vendor code
import 'es6-promise/auto';

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

// Main component to render
import App from '@components/App';



// Vue plugins
// These are integrated libraries that generally deliver new functionality to Vue components (or other objects)
// Generally they inject new functionality (such as this.$route) or read new values from the view model definition (such as metaInfo)

// NOTE: plugins are NOT the same as directives. Directives add templating functionality and are imported in each component they are used in.

// Officially supported router
import VueRouter from '@plugins/vue-router';

// Handling meta tags and <head> per component
import VueMeta from '@plugins/vue-meta';

// Throttled event callbacks that use requestAnimationFrame for more performant operations
import VueThrottleEvent from '@plugins/vue-throttle-event';

// Global state management
import Vuex from '@plugins/vuex';



// Set configuration options for Vue
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({

	// This app will be injected into #app (see index.html)
	el: '#app',
	template: '<app></app>',
	components: {
		App: App
	},

	// These guys are available in components as...

	// this.$throttle
	meta: VueMeta,

	// this.$throttle
	throttle: VueThrottleEvent,

	// this.$router
	router: VueRouter,

	// this.$store
	store: Vuex

});
