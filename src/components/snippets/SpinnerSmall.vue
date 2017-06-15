
<script>
	export default {
		name: 'spinner-small',
		props: ['width', 'strokeWidth']
	};
</script>

<template>

	<spinner class="view-spinner-small"></spinner>

</template>

<style lang="scss">
	@import '~@shared-styles';
	.view-spinner-small {
		width: 1em;
		height: 1em;
	}
</style>
