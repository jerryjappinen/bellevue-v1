<script>
	// import { composeClassnames } from '@util';

	export default {
		name: 'footer-summary',

		// props: ['left'],

		computed: {

			// classes: function () {
			// 	return composeClassnames({
			// 		left: this.left ? true : false
			// 	}, 'view-footer-summary');
			// }

		}

	};

</script>

<template>

	<p class="view-footer-summary">
		<slot></slot>
	</p>

</template>

<style lang="scss">
	@import '~@shared-styles';

	.view-footer-summary {
		text-align: center;
		@include type-discreet;
	}

</style>
