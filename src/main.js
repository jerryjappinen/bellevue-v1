
// Magical vendor code
import 'es6-promise/auto';

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

// Main component to render
import App from '@components/App';

// Vue plugins
import VueRouter from '@plugins/vue-router';
import VueMeta from '@plugins/vue-meta';
import VueThrottleEvent from '@plugins/vue-throttle-event';
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
