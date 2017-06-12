
<!--

This is a read-only component that visualizes state. Wrap this component in a control component to deliver complete form element behavior.

-->

<script>

	// Utilities
	import util from '@util';

	// View model
	export default {
		name: 'checkbox',

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
				}, 'view-checkbox');
			}

		}

	};

</script>

<template>
	<div class="view-checkbox" :class="classes">
		<icon class="view-checkbox-icon" asset="check" :mono="true"></icon>
	</div>
</template>

<style lang="scss">
	@import '~@shared-styles';

	$checkbox-content-area: 0.8em;
	$checkbox-padding: 0.2em;

	.view-checkbox,
	.view-checkbox-icon {
		@include transition-slow;
		@include transition-properties-common;
	}

	.view-checkbox-enabled.view-checkbox-on,
	.view-checkbox-enabled.view-checkbox-on .view-checkbox-icon {
		@include transition-fast;
	}

	.view-checkbox {
		position: relative;
		top: -1px;
		display: inline-block;

		width: $checkbox-content-area;
		height: $checkbox-content-area;
		padding: $checkbox-padding;

		vertical-align: middle;
		@include radius-tight;

		// Default for enabled, off state
		color: $color-white;
		background-color: $color-lightgrey;
	}

	.view-checkbox-icon {

		// Default for off state
		opacity: 0;

		// NOTE: Vue will unwrap the custom tag when rendering
		// Using `&` here increases specificity and allows overriding defaults set in `Icon.vue`
		// I could also nest this under `.view-checkbox` for the same result
		&.view-icon {
			display: block;
			width: $checkbox-content-area;
			height: $checkbox-content-area;
		}

	}



	// On/off states

	.view-checkbox-on {
		background-color: $color-primary;

		.view-checkbox-icon {
			opacity: 1;
		}

	}

	// .view-checkbox-off {}



	// Enabled/disabled states

	.view-checkbox-enabled {

		&:hover {
			background-color: color-darken($color-lightgrey);
		}

		&.view-checkbox-on {
			&:hover {
				background-color: color-darken($color-primary);
			}
		}

	}

	.view-checkbox-disabled {
		color: $color-lightgrey;

		&.view-checkbox-on {
			background-color: $color-grey;
		}

	}



	// Feedback under controls
	// Utility classes should be used by the component or element that controls the behavior
	// This is already set in the standard control components
	.control-enabled {
		&:hover {

			.view-checkbox {
				transform: scale($scale-verylarge);
			}

		}
	}

</style>
