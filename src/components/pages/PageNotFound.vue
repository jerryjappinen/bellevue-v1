
<script>
	export default {
		name: 'page-not-found',

		computed: {
			requestedAddress: function () {
				return this.$route.fullPath;
			}
		},

		methods: {
			backToHome: function () {
				this.$router.push({
					name: 'home'
				});
			}
		}

	};
</script>

<template>

	<page class="view-page-not-found" limit="small">
		<blank-state title="Page not found" description="Looks like this page doesn't exist. 😕">
			<click-button :callback="backToHome">Back to home page</click-button>
		</blank-state>
	</page>

</template>

<style lang="scss">
	// @import '~@shared-styles';

	// .view-page-not-found {
	// }

</style>
