<script>
	import _ from 'lodash';
	import util from '@util';
	export default {
		name: 'click-button',

		props: {

			// Accept any value for disabled, will be checked for truthyness
			disabled: {},

			// Either icon or label should be used, but not necessarily both
			// FIXME: how would I validate this?
			icon: {
				type: String,
				required: false

				// FIXME: should check if slot is empty, but have no access to this :(
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
					enabled: !this.disabled
				};
				var style = this.style ? this.style : 'solid';
				classnames[style] = true;
				return util.dom.composeClassnames(classnames, 'view-button');
			}

		},

		methods: {
			onActivate: function () {
				this.callback();
			}
		}

	};

</script>

<template>
	<button
		class="view-button"
		:disabled="disabled ? true : false"
		:class="classes"><icon class="view-button-icon" v-if="icon" :asset="icon"></icon><slot></slot></button>
</template>

<style lang="scss">
	@import '~@shared-styles';

	.view-button {
		@include border-box;
		@include pad;
		@include radius;

		font-weight: 500;

		display: inline-block;
		text-align: center;
		border-width: 2px;

		border-color: transparent;
		transform: scale($scale-normal);

		@include transition-hover-active;
		@include transition-properties-common;

		// Utility class modifiers
		&.block {
			width: 100%;
		}

	}

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

		// Color variations

		&.view-button-plain,
		&.view-button-stroke {
			color: $color-link;

			&:hover {
				color: $color-link-active;
				background-color: $color-dark-translucent;
			}

		}

		&.view-button-stroke,
		&.view-button-solid {
			border-color: $color-primary;

			&:hover {
				border-color: color-saturate($color-primary);
			}

		}

		&.view-button-solid {
			background-color: $color-primary;

			&:hover {
				background-color: color-saturate($color-primary);
			}

		}

	}

	// Only disabled
	.view-button-disabled {

		// Color variations

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
