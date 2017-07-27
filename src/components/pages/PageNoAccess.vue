<script>
	export default {
		name: 'page-no-access'
	};
</script>

<template>

	<page class="view-page-login-info" limit="small">

		<blank-state title="You don't have access to this page" description="Contact your administrators to get access to this page.">
			<a href="/">Go to dashboard</a>
		</blank-state>

	</page>

</template>

<style lang="scss">
	// @import '~@shared-styles';
</style>
