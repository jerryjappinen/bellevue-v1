import Vue from 'vue';

import { api } from '@services';

export default Vue.extend({

	props: {

		id: {
			type: Number,
			required: true
		},

		userId: {
			type: Number,
			required: true
		},

		title: {
			type: String
		},

		body: {
			type: String
		},

		comments: {
			type: Array,
			default: function () {
				return [];
			}
		}

	},

	data: function () {
		return {
			user: null
		};
	},

	computed: {

		hasComments: function () {
			return this.comments.length ? true : false;
		},

		excerpt: function () {
			return this.body.substr(0, 300);
		}

	},

	methods: {

		fetchComments: function () {
			let post = this;
			api.getCommentsForPost(this.id, function (response) {
				post.comments = response.data;
			});
		},

		fetchUser: function () {
			let post = this;
			api.getUser(this.userId, function (response) {
				post.user = response.data;
			});
		}

	},

	created: function () {
		// this.fetchUser();
	}

});
