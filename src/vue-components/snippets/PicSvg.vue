
<script>

	export default {

		name: 'pic-svg',

		props: {

			// Id of the desired item in SVG sprite (should be same as original file name)
			id: {
				type: String,
				required: false
			}

		},

		computed: {

			// https://www.npmjs.com/package/external-svg-sprite-loader
			svgElement: function () {
				return require('@svg/' + this.id + '.svg');
			},

			svgViewBox: function () {
				return this.svgElement ? this.svgElement.viewBox : '';
			},

			svgPath: function () {
				return this.svgElement ? this.svgElement.symbol : '';
			}

		}

	};

</script>

<template>

	<svg class="view-pic-svg" :viewBox="svgViewBox">
		<use :xlink:href="svgPath"></use>
	</svg>

</template>

<style lang="scss">
	@import '~@styles/shared.scss';

	.view-pic-svg {
		width: 1em;
		height: 1em;
	}

</style>
