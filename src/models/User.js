import Vue from 'vue';

export default Vue.extend({

	props: {

		id: {
			type: Number,
			required: true
		},

		name: {
			type: String
		},

		email: {
			type: String
		},

		website: {
			type: String,
			default: null
		}

	},

	computed: {

		hasWebsite: function () {
			return this.website && this.website.length ? true : false;
		}

	}

});
