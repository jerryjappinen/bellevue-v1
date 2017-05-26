
<!--

This is a read-only component that visualizes state. Wrap this component in a control component to deliver complete form element behavior.

-->

<script>

	// Utilities
	import util from '@util';

	// View model
	export default {
		name: 'radio',

		props: [
			'value',
			'selectedOn',
			'disabled'
		],

		data: function () {
			return {
			};
		},

		computed: {

			isOn: function () {
				return this.value === this.selectedOn ? true : false;
			},

			classes: function () {
				return util.dom.composeClassnames({
					on: this.isOn,
					off: !this.isOn,
					enabled: !this.disabled,
					disabled: this.disabled
				}, 'view-radio');
			}

		}

	};

</script>

<template>
	<div class="view-radio" :class="classes">
		<div class="view-radio-knob"></div>
	</div>
</template>

<style lang="scss">
	@import '~@styles/shared';

	.view-radio,
	.view-radio-knob {
		@include transition-slow;
		@include transition-properties-common;
	}

	.view-radio-enabled.view-radio-on,
	.view-radio-enabled.view-radio-on .view-radio-knob {
		@include transition-fast;
	}

	.view-radio {
		@include border-box;
		position: relative;
		top: -1px;
		display: inline-block;

		width: 1em;
		height: 1em;
		vertical-align: middle;
		border-width: 2px;

		@include radius-round;

		// Default for enabled, off state
		border-color: $color-lightgrey;
		background-color: $color-white;
	}

	.view-radio-knob {
		width: 1em;
		height: 1em;

		@include radius-round;
		background-color: $color-primary;

		// Default for off state
		opacity: 0;
		@include keep-full-center(scale(0));

	}



	// On/off states

	.view-radio-on {
		border-color: $color-primary;

		.view-radio-knob {
			opacity: 1;
			@include keep-full-center(scale(0.5));
		}

	}

	// .view-radio-off {}



	// Enabled/disabled states

	// .view-radio-enabled {}

	.view-radio-disabled {

		&.view-radio-on {
			border-color: $color-grey;
			background-color: $color-lightgrey;

			.view-radio-knob {
				background-color: $color-grey;
			}

		}

	}



	// Feedback under controls
	// Utility classes should be used by the component or element that controls the behavior
	// This is already set in the standard control components
	.control-enabled {
		&:hover {

			.view-radio-off {
				transform: scale($scale-verylarge);
			}

		}
	}

</style>
