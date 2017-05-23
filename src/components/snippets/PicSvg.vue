
<script>

	// Custom utils
	import util from '@util';

	export default {

		name: 'pic-svg',

		props: {

			// Id of the desired item in SVG sprite (should be same as original file name)
			asset: {
				type: String,
				required: false
			},

			title: {
				type: String,
				required: false
			}

		},

		computed: {

			renderedTitle: function () {
				if (this.title) {
					var title = util.string.trimWhitespace(this.title);
					if (title.length < 0) {
						return title;
					}
				}
				return null;
			},

			ariaHiddenValue: function () {
				return this.renderedTitle ? 'false' : 'true';
			},

			// https://www.npmjs.com/package/external-svg-sprite-loader
			svgElement: function () {
				return require('@svg/' + this.asset + '.svg');
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

	<svg class="view-pic-svg" role="img" :viewBox="svgViewBox" :aria-hidden="ariaHiddenValue">
		<title v-if="renderedTitle">{{ renderedTitle }}</title>
		<use :xlink:href="svgPath"></use>
	</svg>

</template>

<style lang="scss">
	// @import '~@styles/shared.scss';
	// .view-pic-svg {}
</style>
