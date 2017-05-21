
<!--
SVG component specifically meant for icons

More coloring and stacking etc. options will be added in the future
-->

<script>

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
		props: [
			'asset',
			'title'
		],

		computed: {

			// classes: function () {}

		}

	};

</script>

<template>

	<pic-svg class="view-icon" :asset="asset"></pic-svg>

</template>

<style lang="scss">

	.view-icon {
		width: 1em;
		height: 1em;
	}

</style>
