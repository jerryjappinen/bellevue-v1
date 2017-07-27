<script>
	import { isString, trim } from 'lodash';

	export default {
		name: 'pic-img',

		props: {

			// Path of the desired static assets to use in an <img> tag
			src: {
				type: String,
				required: false
			},

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

			renderedTitle: function () {
				return isString(this.title) ? trim(this.title) : '';
			},



			// Path handling

			// FIXME: quick hack
			isAbsoluteSrc: function () {
				if (this.src.substr(0, 4) === 'http') {
					return true;
				}
				return false;
			},

			imgPath: function () {

				if (this.isAbsoluteSrc) {
					return this.src;
				}

				// NOTE
				// this is how you resolve a URL programmatically
				// passing the URL directly to the template would be escaped
				return require('@assets/' + this.src);
			},



			// Hiding

			canBeHidden: function () {
				return this.hideUntilLoaded || isString(this.hideUntilLoaded);
			},

			isActuallyHidden: function () {
				return this.canBeHidden && this.isHidden;
			},



			// Helpers for bindings

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

	<img
		v-images-loaded="onImgLoad"
		class="view-pic-img"
		:class="stateClasses"
		:src="imgPath"
		:alt="renderedTitle"
		:title="renderedTitle">

</template>

<style lang="scss">
	@import '~@shared-styles';

	.view-pic-img {
		display: inline-block;

		&.is-hidden,
		&.was-hidden {
			@include transition-medium(opacity);
		}

		&.is-hidden {
			opacity: 0;
		}

	}

</style>
