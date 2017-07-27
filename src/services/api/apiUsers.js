import { User } from '@models';

export default {

	// computed: {},

	methods: {

		// Return a new model instance instead of the raw data
		transformUser: function (userData) {
			return new User({
				propsData: userData
			});
		},

		getUsers: function (onSuccess, onFail, onEither) {
			return this.get(
				'users',
				{},
				onSuccess,
				onFail,
				onEither,
				this.transformUser
			);
		},

		getUser: function (id, onSuccess, onFail, onEither) {
			return this.get(
				'users/' + id,
				{},
				onSuccess,
				onFail,
				onEither,
				this.transformUser
			);
		}

	}

};
