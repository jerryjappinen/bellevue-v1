
<script>

	// FIXME
	// - this should be a wrapper for two separate components
	// - SVG and IMG logic tend to bloat, have nothing to share
	// - <icon> component should then reuse <pic-svg>

	// Vendor
	import _ from 'lodash';

	// Directives
	import ImagesLoaded from '@directives/images-loaded';

	// View model
	export default {

		name: 'Pic',

		directives: {
			ImagesLoaded: ImagesLoaded
		},

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

			// NOTE: only supported for IMG
			hideUntilLoaded: {
				// type: Boolean,
				// default: false
			},

			title: {
				type: String,
				required: false
			}

		},

		data: function () {
			return {
				isHidden: false
			};
		},

		computed: {

			isSvg: function () {
				if (_.isString(this.id) && !_.isEmpty(this.id)) {
					return true;
				}
				return false;
			},

			isImg: function () {
				if (
					!this.isSvg &&
					_.isString(this.src) &&
					!_.isEmpty(this.src)
				) {
					return true;
				}
				return false;
			},

			isAbsoluteSrc: function () {
				if (this.isImg && this.src.substr(0, 4) === 'http') {
					return true;
				}
				return false;
			},

			canBeHidden: function () {
				return this.isImg && (this.hideUntilLoaded || _.isString(this.hideUntilLoaded));
			},

			isActuallyHidden: function () {
				return this.canBeHidden && this.isHidden;
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

					if (this.isAbsoluteSrc) {
						return this.src;
					}

					// NOTE
					// this is how you resolve a URL programmatically
					// passing the URL directly to the template would be escaped
					return require('@assets/' + this.src);

				}
				return null;
			},



			// For HTML

			// FIXME: should have a generic utility for composing these
			stateClasses: function () {
				return {
					'is-hidden': this.isActuallyHidden,
					'was-hidden': this.canBeHidden && !this.isActuallyHidden
				};
			}

		},

		methods: {

			// Actions

			hide: function () {
				this.isHidden = true;
			},

			unhide: function () {
				this.isHidden = false;
			},



			// Bindings

			onImgLoad: function (event) {
				this.unhide();
			}

		},

		beforeMount: function () {
			if (this.canBeHidden) {
				this.hide();
			}
		}

	};

</script>

<template>

	<span class="view-pic" :class="stateClasses">

		<!-- SVG object -->
		<svg v-if="isSvg"
			class="view-pic-image view-pic-image-svg"
			:viewBox="svgViewBox">
			<use :xlink:href="svgPath"></use>
		</svg>

		<!-- IMG -->
		<img v-else
			class="view-pic-image view-pic-image-img"
			v-images-loaded="onImgLoad"
			:src="imgPath"
			:alt="renderedTitle"
			:title="renderedTitle">

	</span>

</template>

<style lang="scss">
	@import '~@styles/shared.scss';

	.view-pic {
		display: inline-block;

		&.is-hidden,
		&.was-hidden {
			@include transition-medium(opacity);
		}

		&.is-hidden {
			opacity: 0;
		}

	}

	.view-pic-image-svg {
		width: 1em;
		height: 1em;
	}

</style>
