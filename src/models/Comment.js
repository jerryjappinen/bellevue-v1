import Vue from 'vue';

export default Vue.extend({

	props: {

		id: {
			type: Number,
			required: true
		},

		postId: {
			type: Number,
			required: true
		},

		name: {
			type: String
		},

		email: {
			type: String
		},

		body: {
			type: String
		}

	},

	computed: {

		excerpt: function () {
			return this.body.substr(0, 100);
		}

	}

});
