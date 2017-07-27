<script>
	import { includes } from 'lodash';
	import { composeClassnames } from '@util';

	const colors = ['dark', 'blue', 'green', 'yellow', 'orange', 'red'];

	export default {
		name: 'tag',

		props: {
			disabled: {},

			icon: {
				type: String,
				required: false
			},

			color: {
				type: String,
				required: false,
				default: colors[0],
				validator: function (value) {
					return includes(colors, value);
				}
			}

		},

		computed: {

			hasText: function () {
				return this.$slots.default && this.$slots.default.length ? true : false;
			},

			classes: function () {

				let classnames = {

					// Icon and/or text
					withText: this.hasText,
					noText: !this.hasText,
					withIcon: this.icon ? true : false,
					noIcon: !this.icon ? true : false,

					// States
					disabled: this.disabled ? true : false,
					enabled: !this.disabled

				};

				classnames[this.color] = true;

				return composeClassnames(classnames, 'view-tag');
			}

		}

	};

</script>

<template>

	<!-- NOTE: Need to keep this on one line to not add whitespace -->
	<span class="view-tag" :class="classes"><icon class="view-tag-icon" v-if="icon" :asset="icon" :scale-up="false"></icon> <slot></slot></span>

</template>

<style lang="scss">
	@import '~@shared-styles';

	// Used below for enabled tags
	@mixin tag-color-values ($color-value) {
		color: $color-value;
		border-color: $color-value;
	}

	@mixin tag-colors ($color-name, $color-value) {
		&.view-tag-#{$color-name} {
			@include tag-color-values($color-value);
		}
	}



	.view-tag {
		@include border-box;
		@include radius;

		font-weight: 500;
		line-height: 1;

		position: relative;
		display: inline-block;
		@include pad;
		border-width: 1px;
		text-align: center;

		border-color: transparent;

		@include transition-slow;
		@include transition-properties-common;

		// Utility class modifiers
		&.block {
			width: 100%;
		}

	}

	.view-tag-icon {
		vertical-align: top;
	}

	.view-tag-enabled {
		@include tag-colors('blue', $color-blue);
		@include tag-colors('green', $color-green);
		@include tag-colors('yellow', $color-yellow);
		@include tag-colors('orange', $color-orange);
		@include tag-colors('red', $color-red);
		@include tag-colors('dark', $color-dark);
	}

	.view-tag-disabled {
		@include tag-color-values($color-grey);
	}

</style>
