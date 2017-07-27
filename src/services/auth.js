// Auth service
//
// - Current login status
import Vue from 'vue';

import api from './api';
import config from '@config';

export default new Vue({

	data: function () {
		return {
			maxAccessLevel: config.routePermissionRoles.length,
			currentAccount: null,
			isLoading: false
		};
	},

	computed: {

		isConfirmed: function () {
			return this.currentAccount ? true : false;
		}

	},

	methods: {

		// Privileges checking

		isAdmin: function () {
			return this.isConfirmed && this.currentAccount.isAdmin;
		},

		canAccessRoute: function (routeName) {
			let routeLevel = config.routePermissions[routeName];
			if (
				// 0 means guests can access
				!routeLevel ||

				// level is > 0, user with at least matching level must be set
				(this.isConfirmed && routeLevel <= this.currentAccount.accessLevel)
			) {
				return true;
			}
			return false;
		},



		// Log in or out

		unsetCurrentAccount: function () {
			if (this.currentAccount) {
				this.currentAccount = null;
			}
		},

		confirmAuthentication: function (id) {
			this.isLoading = true;

			// Return promise
			let service = this;
			return api.getAuth(

				// Success callback
				function (response) {
					// console.log('auth service: confirmed authentication OK', response);
					service.currentAccount = response.data.account;
				},

				// Error callback
				function (error) {
					console.log('auth service: ERROR confirming authentication', error);
				},

				// Always callback
				function () {
					service.isLoading = false;
				}

			);

		}

	},

	created: function () {
		this.confirmAuthentication();
	}

});
