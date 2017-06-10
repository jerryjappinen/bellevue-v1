
import _ from 'lodash';
import Vue from 'vue';

const delay = 6 * 1000;

export default new Vue({

	data: function () {
		return {
			message: null
		};
	},

	computed: {

		shouldBeShown: function () {
			return this.message ? true : false;
		}

	},

	methods: {

		show: function (message) {
			if (message) {
				this.message = message;
			}
		},

		close: function () {
			if (this.message !== null) {
				this.message = null;
			}
		}

	},

	watch: {

		message: _.debounce(function () {
			this.close();
		}, delay)

	}

});
