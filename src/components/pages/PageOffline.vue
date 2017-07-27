<script>
	export default {
		name: 'page-offline'
	};
</script>

<template>

	<page class="view-page-offline" limit="small">
		<blank-state title="You are offline"
			description="Please check you internet connection to use this app. This page will automatically refresh when you're back online.">
		</blank-state>
	</page>

</template>

<style lang="scss">
	// @import '~@shared-styles';
	// .view-page-offline {}
</style>
