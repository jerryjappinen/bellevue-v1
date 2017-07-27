<script>
	import { auth } from '@services';

	export default {
		name: 'panel-readme',

		computed: {

			showAdminTools: function () {
				return auth.isAdmin ? true : false;
			}

		}

	};

</script>

<template>

	<panel class="view-panel-readme" v-once>

		<panel-content class="bodytext">

			<h1>What's new</h1>

			<h2>This and that</h2>
			<p>You can now do this and that with this app. Previously you couldn't. We hope you're happy now!</p>

		</panel-content>

		<panel-content v-if="showAdminTools">

			<h1>Debugging</h1>

			<ul class="bodytext">
				<li><router-link :to="{ name: 'console' }">Console</router-link></li>
			</ul>

		</panel-content>

	</panel>

</template>

<style lang="scss">
	// @import '~@shared-styles';
	// .view-panel-readme {}
</style>
