import _ from 'lodash';
import Vue from 'vue';

export default Vue.extend({

	props: {

		id: {
			type: Number,
			required: false,
			validator: function (id) {
				if (id === null || (_.isInteger(id) && id >= 0)) {
					return true;
				}
				return false;
			}
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
			if (_.isInteger(this.id) && this.id >= 0) {
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
