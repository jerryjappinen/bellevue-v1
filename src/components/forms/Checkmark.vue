
<!--

This is a read-only component that visualizes state. Wrap this component in a control component to deliver complete form element behavior.

-->

<script>
	import { composeClassnames } from '@util';

	export default {
		name: 'checkmark',

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
				}, 'view-checkmark');
			}

		}

	};

</script>

<template>
	<div class="view-checkmark" :class="classes">
		<icon class="view-checkmark-icon" asset="check"></icon>
	</div>
</template>

<style lang="scss">
	@import '~@shared-styles';

	$checkmark-size: 1em;

	.view-checkmark,
	.view-checkmark-icon {
		@include transition-slow;
		@include transition-properties-common;
	}

	.view-checkmark-enabled.view-checkmark-on,
	.view-checkmark-enabled.view-checkmark-on .view-checkmark-icon {
		@include transition-fast;
	}

	.view-checkmark {
		position: relative;
		top: -1px;
		display: inline-block;

		width: $checkmark-size;
		height: $checkmark-size;

		vertical-align: middle;
		@include radius-round;

		// Default for enabled, off state
		color: $color-white;
		background-color: $color-lightgrey;
	}

	.view-checkmark-icon {

		// Default for off state
		opacity: 0;

		// NOTE: Vue will unwrap the custom tag when rendering
		// Using `&` here increases specificity and allows overriding defaults set in `Icon.vue`
		// I could also nest this under `.view-checkmark` for the same result
		&.view-icon {
			display: block;
			width: $checkmark-size;
			height: $checkmark-size;
		}

	}



	// On/off states

	.view-checkmark-on {
		background-color: $color-primary;

		.view-checkmark-icon {
			opacity: 1;
		}

	}

	// .view-checkmark-off {}



	// Enabled/disabled states

	.view-checkmark-enabled {

		&:hover {
			background-color: color-darken($color-lightgrey);
		}

		&.view-checkmark-on {
			&:hover {
				background-color: color-darken($color-primary);
			}
		}

	}

	.view-checkmark-disabled {
		color: $color-lightgrey;

		&.view-checkmark-on {
			background-color: $color-grey;
		}

	}



	// Feedback under controls
	// Utility classes should be used by the component or element that controls the behavior
	// This is already set in the standard control components
	.control-enabled {
		&:hover {

			.view-checkmark {
				transform: scale($scale-verylarge);
			}

		}
	}

</style>
