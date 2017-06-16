
import _ from 'lodash';
import Vue from 'vue';

export default new Vue({

	data: function () {
		return {
			component: null
		};
	},

	computed: {

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
