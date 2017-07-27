// NOTE: this only provides mock API functionality, as you can see below

import { Account } from '@models';

export default {

	methods: {

		transformAuth: function (user) {
			return {
				expires: null,
				account: new Account({
					propsData: {
						id: user.id,
						email: user.email,
						name: user.name,
						role: 'loggedUser'
					}
				})
			};
		},

		getAuth: function (onSuccess, onFail, onEither) {
			return this.get(
				'users/1',
				{},
				onSuccess,
				onFail,
				onEither,
				this.transformAuth
			);
		}

	}

};
