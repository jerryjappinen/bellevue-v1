import { Post } from '@models';

export default {

	// computed: {},

	methods: {

		// Return a new model instance instead of the raw data
		transformPost: function (postData) {
			return new Post({
				propsData: postData
			});
		},

		getPosts: function (onSuccess, onFail, onEither) {
			return this.get(
				'posts',
				{},
				onSuccess,
				onFail,
				onEither,
				this.transformPost
			);
		},

		getPost: function (id, onSuccess, onFail, onEither) {
			return this.get(
				'posts/' + id,
				{},
				onSuccess,
				onFail,
				onEither,
				this.transformPost
			);
		}

	}

};
