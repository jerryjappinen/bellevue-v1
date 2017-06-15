
import _ from 'lodash';

// Set a computed property to automatically store in localStorage
// https://vuejs.org/v2/guide/mixins.html
export default {

	watch: {

		// Store serialized data into localStorage when it changes (throttled)
		persist: _.debounce(function (data) {
			console.log('persist data changed', this.$options.name);
			if (this.$options.name) {
				console.log('setItem', this.$options.name, data);
				localStorage.setItem(this.$options.name, JSON.stringify(data));
			}
		}, 500)

	},

	created: function () {
		if (this.$options.name && this.persist) {

			// Load serialized data from localStorage
			// NOTE: this is a synchronous operation
			var data = localStorage.getItem(this.$options.name);
			console.log('object with persist created, getItem', this.$options.name, data);

			if (data) {
				try {
					data = JSON.parse(data);

					// We found data in local storage, let's load it up
					if (data) {
						this.persist = data;
					}

				} catch (error) {
					console.log(error);
				}
			}

		}

	}

};
