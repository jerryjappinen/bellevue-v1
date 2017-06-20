<script>
	import _ from 'lodash';
	import util from '@util';
	export default {
		name: 'click-button',

		props: {

			// When the button should appear as disabled and not trigger callback
			// Accept any value, will be checked for truthyness
			disabled: {},

			// When the button should appear as active and not rerun the callback
			// Accept any value, will be checked for truthyness
			loading: {},

			// Either icon or label should be used, but not necessarily both
			// FIXME: how would I validate this?
			icon: {
				type: String,
				required: false

				// FIXME: should check if slot is empty, but validators have no access to `this` :(
				// validator: function (value) {
				// 	if (!value && !this.$slots.default) {
				// 		return false;
				// 	}
				// 	return true;
				// }

			},

			theme: {
				type: String,
				required: false,
				validator: function (value) {
					return _.includes(['plain', 'solid', 'stroke'], value);
				}
			},

			color: {
				type: String,
				required: false,
				validator: function (value) {
					return _.includes(['blue', 'green', 'red'], value);
				}
			},

			// Callback is not required, as sometimes a button might be wrapped in another control
			// NOTE: use <link-button> for routed or normal links
			callback: {
				type: Function,
				required: false
			}

		},

		computed: {

			classes: function () {
				var classnames = {
					disabled: this.disabled,
					enabled: !this.disabled,
					loading: this.loading,
					notLoading: !this.loading
				};

				// Include theme and color classnames
				var theme = this.theme ? this.theme : 'solid';
				var color = this.color ? this.color : 'blue';
				classnames[theme] = true;
				classnames[color] = true;
				classnames[theme + '-' + color] = true;

				return util.dom.composeClassnames(classnames, 'view-button');
			}

		},

		methods: {
			onActivate: function () {
				if (!this.disabled && !this.loading) {
					this.callback();
				}
			}
		}

	};

</script>

<template>
	<button
		class="view-button"
		:class="classes"
		:disabled="disabled ? true : false"
		@click="onActivate">
			<!--<transition name="transition-scale-fade" mode="out-in">-->
			<span class="view-button-indicator">
				<spinner-small class="view-button-spinner"></spinner-small>
			</span>
			<span class="view-button-content">
				<icon class="view-button-icon" v-if="icon" :asset="icon"></icon> <slot></slot>
			</span>
	</button>
</template>

<style lang="scss">
	@import '~@shared-styles';

	// Used below for enabled buttons
	@mixin button-colors ($color-name, $color-value) {

		&.view-button-plain-#{$color-name},
		&.view-button-stroke-#{$color-name} {
			color: $color-value;
			&:hover {
				color: color-saturate($color-value);
			}
		}

		&.view-button-stroke-#{$color-name},
		&.view-button-solid-#{$color-name} {
			border-color: $color-value;
			&:hover {
				border-color: color-saturate($color-value);
			}
		}

		&.view-button-solid-#{$color-name} {
			background-color: $color-value;
			&:hover {
				background-color: color-saturate($color-value);
			}
		}

	}



	.view-button {
		@include border-box;
		@include radius;

		font-weight: 500;
		line-height: 1;

		position: relative;
		display: inline-block;
		@include pad-loose;
		border-width: 2px;
		text-align: center;

		border-color: transparent;
		transform: scale($scale-normal);

		@include transition-hover-active;
		@include transition-properties-common;

		// Utility class modifiers
		&.block {
			width: 100%;
		}

	}

	.view-button-icon {
		vertical-align: top;
	}

	.view-button-content,
	.view-button-spinner {
		@include transition-properties-common;
	}

	.view-button-content {
		position: relative;
		z-index: 2;
		display: inline-block;
	}

	.view-button-spinner {
		@include keep-full-center;
		z-index: 1;
		opacity: 0;
	}



	// Loading state

	.view-button-not-loading {

		.view-button-content,
		.view-button-spinner {
			@include transition-slow;
		}

		.view-button-content {
			opacity: 1;
			@include transition-delay-slow;
		}

		.view-button-spinner {
			opacity: 0;
		}

	}

	.view-button-loading {

		.view-button-content,
		.view-button-spinner {
			@include transition-fast;
		}

		.view-button-content {
			opacity: 0;
		}

		.view-button-spinner {
			opacity: 1;
			@include transition-delay-fast;
		}

	}



	// Theme variation baseline

	.view-button-plain {
		border-color: transparent;
	}

	.view-button-solid {
		color: $color-white;
	}

	// Only enabled
	.view-button-enabled {
		@include cursor-pointer;

		// Scale down when pressing
		&:active {
			transform: scale($scale-small);
		}

		&.view-button-plain,
		&.view-button-stroke {
			&:hover {
				background-color: color-translucent($color-dark, 0.05);
			}
		}

		// Color variations
		@include button-colors('blue', $color-blue);
		@include button-colors('green', $color-green);
		@include button-colors('red', $color-red);

	}

	// Only disabled
	.view-button-disabled {

		&.view-button-plain,
		&.view-button-stroke {
			color: $color-grey;
		}

		&.view-button-stroke,
		&.view-button-solid {
			border-color: $color-grey;
		}

		&.view-button-solid {
			background-color: $color-grey;
		}

	}

</style>
