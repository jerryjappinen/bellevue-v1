
import Vue from 'vue';

export default Vue.extend({

	props: {

		id: {
			type: Number,
			required: true
		},

		title: {
			type: String
		}

	},

	// data: function () {
	// 	return {
	// 	};
	// },

	computed: {

		idIsValid: function () {
			if (typeof this.id === 'number' && this.id > -1) {
				return true;
			}
			return false;
		},

		isValid: function () {
			return this.idIsValid;
		},

		sanitizedTitle: function () {
			return this.title ? this.title : 'Some role';
		}

	}

});
