
<script>
	export default {
		name: 'page-not-found',

		computed: {
			requestedAddress: function () {
				return this.$route.fullPath;
			}
		}

	};
</script>

<template>

	<div class="view-page-not-found">

		<h1>Page not found</h1>

		<p>Looks like this page doesn't exist. 😕</p>

		<p><code>{{ requestedAddress }}</code></p>

	</div>

</template>

<style lang="scss">
	// @import '~@shared-styles';
	// .view-page-not-found {}
</style>
