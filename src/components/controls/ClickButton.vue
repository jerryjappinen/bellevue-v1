<script>
	import { includes } from 'lodash';
	import { composeClassnames } from '@util';

	const themes = ['solid', 'plain', 'stroke'];
	const colors = ['blue', 'green', 'red'];

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
				default: themes[0],
				validator: function (value) {
					return includes(themes, value);
				}
			},

			color: {
				type: String,
				required: false,
				default: colors[0],
				validator: function (value) {
					return includes(colors, value);
				}
			},

			route: {
				type: Object,
				required: false
			},

			// Callback is not required, as sometimes a button might be wrapped in another control
			// NOTE: use <link-button> for routed or normal links
			callback: {
				type: Function,
				required: false
			}

		},

		computed: {

			hasText: function () {
				return this.$slots.default && this.$slots.default.length ? true : false;
			},

			isLink: function () {
				return this.route ? true : false;
			},

			tag: function () {
				return this.isLink ? 'router-link' : 'button';
			},

			extraPropBindings: function () {
				var bindings = {};
				if (this.isLink) {
					bindings['to'] = this.route;
				}
				return bindings;
			},

			extraEventBindings: function () {
				var bindings = {};
				if (!this.isLink) {
					bindings['click'] = this.onActivate;
				}
				return bindings;
			},

			classes: function () {

				// API
				var classnames = {

					// Icon and/or text
					withText: this.hasText,
					noText: !this.hasText,
					withIcon: this.icon ? true : false,
					noIcon: !this.icon ? true : false,

					// States
					disabled: this.disabled ? true : false,
					enabled: !this.disabled,
					loading: this.loading,
					notLoading: !this.loading

				};

				// Include theme and color classnames
				classnames[this.theme] = true;
				classnames[this.color] = true;
				classnames[this.theme + '-' + this.color] = true;

				return composeClassnames(classnames, 'view-click-button');
			}

		},

		methods: {

			onActivate: function (event) {
				if (!this.disabled && !this.loading) {
					this.callback(event);
				}
			}

		}

	};

</script>

<template>

	<!-- Renders either a router-link, or a button element -->
	<component
		:is="tag"
		v-bind="extraPropBindings"
		v-on="extraEventBindings"

		class="view-click-button"
		:class="classes"
		:disabled="disabled ? true : false">
			<span class="view-click-button-indicator">
				<inline-spinner class="view-click-button-spinner" :adjust="false"></inline-spinner>
			</span>
			<span class="view-click-button-content">
				<icon class="view-click-button-icon" v-if="icon" :asset="icon" :scale-up="true"></icon> <slot></slot>
			</span>
	</component>
</template>

<style lang="scss">
	@import '~@shared-styles';

	// Used below for enabled buttons
	@mixin button-colors ($color-name, $color-value) {

		&.view-click-button-plain-#{$color-name},
		&.view-click-button-stroke-#{$color-name} {
			color: $color-value;
			&:hover {
				color: color-saturate($color-value);
			}
		}

		&.view-click-button-stroke-#{$color-name},
		&.view-click-button-solid-#{$color-name} {
			border-color: $color-value;
			&:hover {
				border-color: color-saturate($color-value);
			}
		}

		&.view-click-button-solid-#{$color-name} {
			background-color: $color-value;
			&:hover {
				background-color: color-saturate($color-value);
			}
		}

	}



	.view-click-button {
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

	.view-click-button-icon {
		vertical-align: top;
	}

	.view-click-button-content,
	.view-click-button-spinner {
		@include transition-properties-common;
	}

	.view-click-button-content {
		position: relative;
		z-index: 2;
		display: inline-block;
	}

	.view-click-button-spinner {
		@include keep-full-center;
		z-index: 1;
		opacity: 0;
	}



	// Loading state

	.view-click-button-not-loading {

		.view-click-button-content,
		.view-click-button-spinner {
			@include transition-slow;
		}

		.view-click-button-content {
			opacity: 1;
			@include transition-delay-slow;
		}

		.view-click-button-spinner {
			opacity: 0;
		}

	}

	.view-click-button-loading {

		.view-click-button-content,
		.view-click-button-spinner {
			@include transition-fast;
		}

		.view-click-button-content {
			opacity: 0;
		}

		.view-click-button-spinner {
			opacity: 1;
			@include transition-delay-fast;
		}

	}



	// Theme variation baseline

	.view-click-button-plain {
		border-color: transparent;
	}

	.view-click-button-solid {
		color: $color-white;
	}

	// Only enabled
	.view-click-button-enabled {
		@include cursor-pointer;

		// Scale down when pressing
		&:active {
			transform: scale($scale-small);
		}

		&.view-click-button-plain,
		&.view-click-button-stroke {
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
	.view-click-button-disabled {

		&.view-click-button-plain,
		&.view-click-button-stroke {
			color: $color-grey;
		}

		&.view-click-button-stroke,
		&.view-click-button-solid {
			border-color: $color-grey;
		}

		&.view-click-button-solid {
			background-color: $color-grey;
		}

	}

</style>
