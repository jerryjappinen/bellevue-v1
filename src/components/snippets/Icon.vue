
<!--
SVG component specifically meant for icons

More coloring and stacking etc. options will be added in the future
-->

<script>
	import { composeClassnames } from '@util';

	export default {
		name: 'icon',

		// NOTE: not bothering with validation here since
		// - asset is just passed to child component
		props: {
			asset: {},
			scaleUp: {
				default: false
			},
			adjust: {
				default: false
			},
			title: {}
		},

		computed: {

			classes: function () {
				return composeClassnames({
					scaleUp: this.scaleUp,
					adjust: this.adjust
				}, 'view-icon');
			}

		}

	};

</script>

<template>

	<pic-svg class="view-icon" :class="classes" :asset="asset"></pic-svg>

</template>

<style lang="scss">

	.view-icon {
		width: 1em;
		height: 1em;
	}

	.view-icon-adjust {
		position: relative;
		top: -0.1em;
	}

	.view-icon-scale-up {
		// margin-left: 0.25em;
		// margin-right: 0.25em;
		transform: scale(1.5);
	}

</style>
