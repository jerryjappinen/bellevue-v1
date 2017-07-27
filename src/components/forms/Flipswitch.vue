
<!--

This is a read-only component that visualizes state. Wrap this component in a control component to deliver complete form element behavior.

-->

<script>
	import { composeClassnames } from '@util';

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
				return composeClassnames({
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
	@import '~@shared-styles';

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

		width: 50px;
		height: 28px;
		border-width: 2px;

		border-radius: 16px;
		vertical-align: middle;

		// Default for enabled, off state
		background-color: $color-white;
	}

	.view-flipswitch-knob {
		position: relative;
		top: 2px;
		left: 23px;
		box-sizing: border-box;

		display: block;

		width: 24px;
		height: 24px;
		@include background-clip-padding-box;
		@include radius-round;

		// Default for off state
		background-color: $color-white;
		@include shadow-transparent;
		transform: translate3d(-21px, 0, 0);
	}



	// On/off states

	.view-flipswitch-on {
		background-color: $color-link;

		.view-flipswitch-knob {
			opacity: 1;

			@include shadow;
			transform: translate3d(0, 0, 0);
		}

	}



	// Enabled/disabled states

	.view-flipswitch-enabled {
		border-color: $color-link;

		&:hover {
			transform: scale($scale-large);
		}

		&.view-flipswitch-off {
			.view-flipswitch-knob {
				background-color: $color-link;
			}
		}

	}

	.view-flipswitch-disabled {
		color: $color-grey;

		&.view-flipswitch-on {
			background-color: $color-grey;
		}

		&.view-flipswitch-off {
			.view-flipswitch-knob {
				background-color: $color-lightgrey;
			}
		}

	}



	// Feedback under controls
	// Utility classes should be used by the component or element that controls the behavior
	// This is already set in the standard control components
	.control-enabled {
		&:hover {
			.view-flipswitch {
				transform: scale($scale-large);
			}
		}
		&:active {
			.view-flipswitch {
				@include transition-fast;
				transform: scale($scale-small);
			}
		}
	}

</style>
