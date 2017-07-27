
<script>
	import { composeClassnames } from '@util';

	export default {
		name: 'inline-spinner',

		props: {
			width: {},
			strokeWidth: {},
			scaleUp: {
				default: false
			},
			adjust: {
				default: true
			}
		},

		computed: {

			classes: function () {
				return composeClassnames({
					scaleUp: this.scaleUp,
					adjust: this.adjust
				}, 'view-inline-spinner');
			}

		}

	};

</script>

<template>
	<spinner class="view-inline-spinner" :class="classes"></spinner>
</template>

<style lang="scss">
	@import '~@shared-styles';

	.view-inline-spinner {
		width: 1em;
		height: 1em;
	}

	.view-inline-spinner-scale-up {
		margin-left: 0.25em;
		margin-right: 0.25em;
		transform: scale(1.5);
	}

	.view-inline-spinner-adjust {
		position: relative;
		top: -0.1em;
	}

</style>
