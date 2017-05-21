
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
		<div class="view-radio-bullet"></div>
	</div>
</template>

<style lang="scss">
	@import '~@styles/shared.scss';

	.view-radio,
	.view-radio-icon {
		@include transition-fast;
		@include transition-properties-common;
	}

	.view-radio {
		@include border-box;
		position: relative;
		top: -1px;
		display: inline-block;

		width: 1em;
		height: 1em;
		vertical-align: middle;
		border-width: 1px;

		@include radius-round;

		// Default for enabled, off state
		border-color: $color-lightgrey;
		background-color: $color-white;
	}

	.view-radio-bullet {
		position: absolute;
		top: 0.2em;
		left: 0.2em;
		width: 0.6em;
		height: 0.6em;
		margin-top: -1px;
		margin-left: -1px;
		@include radius-round;
		background-color: $color-green;

		// Default for off state
		opacity: 0;
		transform: scale(0);

	}



	// On/off states

	.view-radio-on {
		border-color: $color-green;

		.view-radio-bullet {
			opacity: 1;
			transform: scale(1);
		}

	}

	// .view-radio-off {}



	// Enabled/disabled states

	// .view-radio-enabled {}

	.view-radio-disabled {

		&.view-radio-on {
			border-color: $color-grey;
			background-color: $color-lightgrey;
			.view-radio-on {
				background-color: $color-grey;
			}
		}

	}



	// Feedback under controls


	// FIXME: these selectors should probably be a mixin that can be shared accross components
	// Something like @selector-under-controls
	.view-click-enabled,
	.view-set-enabled,
	.view-toggle-enabled {

		.view-radio-enabled {

			&:hover {
				background-color: color-darken($color-lightgrey);
			}

			&.view-radio-on {
				&:hover {
					background-color: color-darken($color-green);
				}
			}

		}

	}

</style>
