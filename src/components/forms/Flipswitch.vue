
<!--

This is a read-only component that visualizes state. Wrap this component in a control component to deliver complete form element behavior.

-->

<script>

	// Utilities
	import util from '@util';

	// View model
	export default {
		name: 'flipswitch',

		props: [
			'value',
			'disabled'
		],

		data: function () {
			return {
				isOn: this.value
			};
		},

		computed: {

			classes: function () {
				return util.dom.composeClassnames({
					on: this.value,
					off: !this.value,
					enabled: !this.disabled,
					disabled: this.disabled
				}, 'view-flipswitch');
			}

		}

	};

</script>

<template>
	<div class="view-flipswitch" :class="classes">
		<div class="view-flipswitch-knob"></div>
	</div>
</template>

<style lang="scss">
	@import '~@styles/shared';

	$flipswitch-content-area: 0.8em;
	$flipswitch-padding: 0.2em;

	.view-flipswitch,
	.view-flipswitch-knob {
		@include transition-slow;
		@include transition-properties-common;
	}

	.view-flipswitch-enabled.view-flipswitch-on,
	.view-flipswitch-enabled.view-flipswitch-on .view-flipswitch-knob {
		@include transition-fast;
	}

	.view-flipswitch {
		position: relative;
		display: inline-block;

		width: 54px;
		height: 32px;
		vertical-align: middle;

		border-radius: 16px;

		// Default for enabled, off state
		background-color: $color-lightgrey;
	}

	.view-flipswitch-knob {
		position: relative;
		top: 3px;
		left: 24px;
		box-sizing: border-box;

		display: block;

		width: 26px;
		height: 26px;
		@include radius-round;

		// Default for off state
		background-color: $color-white;
		@include shadow-transparent;
		transform: translate3d(-20px, 0, 0);
	}



	// On/off states

	.view-flipswitch-on {
		background-color: $color-primary;

		.view-flipswitch-knob {
			opacity: 1;

			@include shadow;
			transform: translate3d(0, 0, 0);
		}

	}

	// .view-flipswitch-off {}



	// Enabled/disabled states

	.view-flipswitch-enabled {

		&:hover {
			background-color: color-darken($color-lightgrey);
		}

		&.view-flipswitch-on {
			&:hover {
				background-color: color-darken($color-primary);
			}
		}

	}

	.view-flipswitch-disabled {
		color: $color-grey;

		&.view-flipswitch-on {
			background-color: $color-grey;
		}

	}



	// Feedback under controls
	// Utility classes should be used by the component or element that controls the behavior
	// This is already set in the standard control components
	.control-enabled {
		&:hover {

			.view-flipswitch {
				transform: scale($scale-verylarge);
			}

		}
	}

</style>
