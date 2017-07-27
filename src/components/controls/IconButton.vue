
<script>
	export default {
		name: 'icon-button',

		props: {
			disabled: {},
			loading: {},
			icon: {},
			theme: {},
			color: {},
			callback: {}
		}

	};

</script>

<template>

	<click-button
		class="view-icon-button"
		:disabled="disabled"
		:loading="loading"
		:icon="icon"
		:theme="theme"
		:color="color"
		:callback="callback"></click-button>

</template>

<style lang="scss">
	@import '~@shared-styles';

	.view-icon-button {

		&.view-click-button {
			@include radius-round;
			padding-left: $pad-loose-vertical;
			padding-right: $pad-loose-vertical;
		}

		.view-icon-scale-up {
			margin-left: 0;
			margin-right: 0;
		}

	}

</style>
