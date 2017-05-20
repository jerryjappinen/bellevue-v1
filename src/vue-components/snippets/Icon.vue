
<script>

	// Utilities
	import util from '@util';

	// Child components
	import PicSvg from '@components/snippets/PicSvg';

	// View model
	export default {
		name: 'icon',

		components: {
			PicSvg: PicSvg
		},

		// NOTE: not bothering with validation here since
		// - asset is just passed to child component
		// - mono is just checked for truthyness
		props: [
			'asset',
			'mono'
		],

		computed: {

			classes: function () {

				// FIXME: we should write a directive that does this automatically
				return util.dom.composeClassnames({
					'mono': true
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

	.view-icon-mono {
		fill: currentColor;
	}

</style>
