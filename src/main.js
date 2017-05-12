
// Magical vendor code
import 'es6-promise/auto';

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

// Main component to render
import App from '@components/App';

// Vue plugins
import router from '@plugins/router';
import store from '@plugins/store';



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

	// this.$router
	router: router,

	// this.$store
	store: store

});
