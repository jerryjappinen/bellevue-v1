<script>
	import { composeClassnames } from '@util';
	export default {
		name: 'ellipsis',

		props: {
			loading: {
				default: true
			}
		},

		computed: {

			classes: function () {
				return composeClassnames({
					loading: this.loading
				}, 'view-ellipsis');
			}

		}

	};

</script>

<template>

	<!-- NOTE: Need to keep this on one line to not add whitespace -->
	<span class="view-ellipsis" :class="classes"><span class="view-ellipsis-bullet">.</span><span class="view-ellipsis-bullet">.</span><span class="view-ellipsis-bullet">.</span></span>

</template>

<style lang="scss">
	@import '~@shared-styles';

	// .view-ellipsis {}

	.view-ellipsis-loading {

		.view-ellipsis-bullet {
			$duration: 5 * $transition-veryslow;
			$delay: ($duration / 5) / 3;
			@include animation(pulse-delayed, $duration);

			&:nth-child(1) {
				animation-delay: 2 * $delay;
			}

			&:nth-child(2) {
				animation-delay: 1 * $delay;
			}

		}

	}

	// .view-ellipsis-bullet {}

</style>
