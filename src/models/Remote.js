import Vue from 'vue';

const pathValidator = function (path) {
	return typeof path === 'string';
};

export default Vue.extend({

	props: {

		path: {
			type: String,
			required: true,
			validator: pathValidator
		},

		api: {
			type: String,
			required: true,
			validator: pathValidator
		},

		login: {
			type: String,
			required: true,
			validator: pathValidator
		},

		logout: {
			type: String,
			required: true,
			validator: pathValidator
		}

	},

	computed: {

		basePath: function () {
			return this.path;
		},

		apiPath: function () {
			return this.basePath + this.api;
		},

		loginPath: function () {
			return this.basePath + this.login;
		},

		logoutPath: function () {
			return this.basePath + this.logout;
		}

	}

});
