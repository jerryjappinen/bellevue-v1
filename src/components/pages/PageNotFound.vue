
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

	<div class="view-page-not-found">

		<blank-state
			title="Page not found"
			description="Looks like this page doesn't exist. 😕"
			:callback="backToHome"
			callbackLabel="Back to home page">
		</blank-state>

	</div>

</template>

<style lang="scss">
	// @import '~@shared-styles';
	// .view-page-not-found {}
</style>
