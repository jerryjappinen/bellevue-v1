<script>

	import { init, Account, Role } from '@models';

	export default {

		name: 'console-models',

		computed: {

			testRoleModel1: function () {
				return init(Role, {
					id: 3
				});
			},

			testRoleModel2: function () {
				return init(Role, {
					id: 128,
					title: 'Foo'
				});
			},

			testAccount: function () {
				return init(Account, {
					id: 900,
					roleId: this.testRoleModel2.id,
					email: 'esa@gmail.com',
					name: 'Esa'
				});
			}

		},

		methods: {

			changeRoleId: function () {
				this.testRoleModel2.id += 128;
			},

			onAccountTestClick: function () {
				if (this.testAccount) {
					this.testAccount.fetch(this.testAccount.id);
				}
			}

		}

	};

</script>



<template>

	<dl class="view-console-models bodytext">

		<dt>Roles</dt>

		<dd>Role 1: {{ testRoleModel1.sanitizedTitle }} ({{ testRoleModel1.id }})</dd>
		<dd>Role 2: {{ testRoleModel2.sanitizedTitle }} ({{ testRoleModel2.id }})</dd>
		<dd><strong @click="changeRoleId">Click me</strong> to change ID of role 2</dd>

		<template v-if="testAccount && testAccount.isValid">

			<dt>Accounts</dt>

			<dd><em>{{ testAccount.email }}</em> (role ID <em>{{ testAccount.role.id }}</em>)</dd>
			<dd><strong @click="onAccountTestClick">Click me</strong> to fire a failing HTTP request via <code>testAccount</code></dd>

		</template>

	</dl>

</template>



<style lang="scss">

</style>
