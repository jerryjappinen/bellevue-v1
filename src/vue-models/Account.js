
// Vendor code
import Vue from 'vue';

// Models
import Role from '@models/Role';

export default Vue.extend({

	props: {

		id: {
			type: Number,
			required: true
		},

		roleId: {
			type: Number
		},

		name: {
			type: String
		},

		email: {
			type: String
		}

	},

	data: function () {
		return {
			getPath: 'http://localhost:8888/foo/bar'
		};
	},

	computed: {



		// Some validations

		idIsValid: function () {
			return this.id > -1;
		},

		roleIdIsValid: function () {
			return this.roleId > -1;
		},

		isValid: function () {
			return this.idIsValid && this.roleIdIsValid;
		},



		// Other models

		role: function () {
			if (this.roleIdIsValid) {
				return new Role({
					propsData: {
						id: this.roleId
					}
				});
			}
			return null;
		},



		// Helpers

		sanitizedTitle: function () {
			return this.title ? this.title : 'Some role';
		}

	},

	methods: {

		// Fetch info

		onFetchSuccess: function (response) {
			var data = response.body;
			if (this.id !== data.id) {
				this.id = data.id;
			}
			console.log('success', response);
		},

		onFetchFail: function (response) {
			console.log('fail', response);
		},

		fetch: function (id) {

			var params = {
				id: id
			};

			this.$http.get(this.getPath, params, this.onFetchSuccess, this.onFetchFail);

		}

	},

	created: function () {

		window.a = this;

		// If model is created with empty data but ID is available, automatically fetch the data
		if (this.idIsValid && !this.name) {
			this.fetch(this.id);
		}

	}

});
