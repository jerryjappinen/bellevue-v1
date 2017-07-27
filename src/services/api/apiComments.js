import { Comment } from '@models';

export default {

	// computed: {},

	methods: {

		transformComment: function (postData) {
			return new Comment({
				propsData: postData
			});
		},

		getComments: function (onSuccess, onFail, onEither) {
			return this.get(
				'comments',
				{},
				onSuccess,
				onFail,
				onEither,
				this.transformComment
			);
		},

		getCommentsForPost: function (postId, onSuccess, onFail, onEither) {
			return this.get(
				'comments',
				{
					postId: postId
				},
				onSuccess,
				onFail,
				onEither,
				this.transformComment
			);
		},

		getComment: function (id, onSuccess, onFail, onEither) {
			return this.get(
				'comments/' + id,
				{},
				onSuccess,
				onFail,
				onEither,
				this.transformComment
			);
		}

	}

};
