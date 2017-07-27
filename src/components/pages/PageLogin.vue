<script>
	import { env } from '@services';

	export default {
		name: 'page-login',

		computed: {

			loginPath: function () {
				return env.currentRemote.loginPath;
			}

		}

	};
</script>

<template>

	<page class="view-page-login" limit="small">

		<blank-state title="You're not logged in">
			<a :href="loginPath">Log in</a>
		</blank-state>

	</page>

</template>

<style lang="scss">
	// @import '~@shared-styles';
</style>
