
<script>

	import _ from 'lodash';

	// View model
	export default {

		name: 'Pic',

		props: {

			// Id of the desired item in SVG sprite (should be same as original file name)
			id: {
				type: String,
				required: false
			},

			// Path of the desired static assets to use in an <img> tag
			src: {
				type: String,
				required: false
			},

			title: {
				type: String,
				required: false
			}

		},

		computed: {

			isSvg: function () {
				return _.isString(this.id) && !_.isEmpty(this.id);
			},

			isImg: function () {
				return !this.isSvg && _.isString(this.src) && !_.isEmpty(this.src);
			},

			renderedTitle: function () {
				return _.isString(this.title) ? _.trim(this.title) : '';
			},



			// SVG

			// https://www.npmjs.com/package/external-svg-sprite-loader
			svgElement: function () {
				if (this.isSvg) {
					return require('@svg/' + this.id + '.svg');
				}
				return null;
			},

			svgViewBox: function () {
				return this.svgElement ? this.svgElement.viewBox : '';
			},

			svgPath: function () {
				return this.svgElement ? this.svgElement.symbol : '';
			},



			// IMG
			imgPath: function () {
				if (this.isImg) {

					// NOTE
					// this is how you resolve a URL programmatically
					// passing the URL directly to the template would be escaped
					return require('@assets/' + this.src);

				}
				return null;
			}

		},

		methods: {

			// Actions

			increment: function () {
				this.$store.dispatch('increment');
			},

			decrement: function () {
				this.$store.dispatch('decrement');
			},

			// Bindings

			onClick: function (event) {
				return this.reverse ? this.decrement() : this.increment();
			}

		},

		beforeCreate: function () {
			console.log(this.$store, this.$store.state);
		}

	};

</script>

<template>

	<span class="view-pic">

		<!-- SVG object -->
		<svg v-if="isSvg"
			class="view-pic-image view-pic-image-svg"
			:viewBox="svgViewBox">
			<use :xlink:href="svgPath"></use>
		</svg>

		<!-- IMG -->
		<img v-else
			class="view-pic-image view-pic-image-img"
			:src="imgPath"
			:alt="renderedTitle"
			:title="renderedTitle">

	</span>

</template>

<style lang="scss">

	// .view-pic {}

	.view-pic-image {
		width: 1em;
		height: 1em;
	}

</style>
