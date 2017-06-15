
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
				// - would it work if I injected services into the root Vue and set {parent: foo} for them?

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
