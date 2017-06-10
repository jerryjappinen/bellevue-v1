
import _ from 'lodash';
import Vue from 'vue';

export default new Vue({

	// FIXME: would be nice if this was based in routed views

	data: function () {
		return {
			component: null
		};
	},

	computed: {

		serialized: {
			get: function () {
				return {
					component: this.component
				};
			},
			set: function (serialized) {
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

	}

});
