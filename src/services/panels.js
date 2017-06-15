
import _ from 'lodash';
import Vue from 'vue';

export default new Vue({

	data: function () {
		return {
			component: null
		};
	},

	computed: {

		persist: {
			get: function () {
				return {
					component: this.component
				};
			},
			set: function (serialized) {

				// FIXME
				// - would like to only set this if the route is the same as it was when closed
				// - but how do I access the router from the root Vue object?
				// - if we changed the architecture so that services were injected into the root Vue object, this might be possible
				// - but it might be better to persist the panel state in App.vue whose role is orchestrating the rendering, using services

				this.component = serialized.component;
			}
		},

		shouldBeShown: function () {
			return this.component ? true : false;
		}

	},

	methods: {

		open: function (component) {
			if (component) {
				this.component = _.kebabCase(component);
			}
		},

		close: function () {
			this.component = null;
		}

	},

	created: function () {
		window.b = this;
	}

});
