import Vue from 'vue';
import { includes } from 'lodash';

import config from '@config';

export default Vue.extend({

	props: {

		id: {
			type: Number,
			required: true
		},

		email: {
			type: String
		},

		name: {
			type: String
		},

		role: {
			type: String,
			default: null,
			validator: function (value) {
				return value === null || includes(config.routePermissionRoles, value);
			}
		},

		avatarUrl: {
			type: String,
			required: false,
			default: 'user-avatar-placeholder.png'
		}

	},

	computed: {

		nameOrEmail: function () {
			return this.name ? this.name : this.email;
		},

		accessLevel: function () {
			return config.routePermissionRoles.indexOf(this.role) + 1;
		},

		isAdmin: function () {
			let maxAccessLevel = config.routePermissionRoles.length;
			return this.accessLevel >= maxAccessLevel;
		}

	}

});
