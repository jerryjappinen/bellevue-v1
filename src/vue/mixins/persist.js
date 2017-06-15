
import _ from 'lodash';

// Set a computed property to automatically store in localStorage
// https://vuejs.org/v2/guide/mixins.html
export default {

	computed: {

		// NOTE: This can be undefined especially for non-components
		persistKey: function () {
			return this.$options.name;
		}

	},

	watch: {

		// Store serialized data into localStorage when it changes (throttled)
		persist: _.debounce(function (data) {
			if (this.persistKey) {
				localStorage.setItem(this.persistKey, JSON.stringify(data));
			}
		}, 500)

	},

	created: function () {
		if (this.persistKey && this.persist) {

			// Load serialized data from localStorage
			// NOTE: this is a synchronous operation
			var data = localStorage.getItem(this.persistKey);

			if (data) {
				try {
					data = JSON.parse(data);

					// We found data in local storage, let's load it up
					if (data) {
						this.persist = data;
					}

				} catch (error) {
					console.error(error);
				}
			}

		}

	}

};
