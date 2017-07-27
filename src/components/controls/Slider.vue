
<!--

This is a read-only component that visualizes state. Wrap this component in a control component to deliver complete form element behavior.

-->

<script>
	import { composeClassnames } from '@util';
	import config from '@config';

	// See docs: https://nightcatsama.github.io/vue-slider-component/example/
	// NOTE: this is an external component, so we have to import it manually
	import VueSliderComponent from 'vue-slider-component';

	export default {
		name: 'slider',

		components: {
			VueSliderComponent
		},

		props: {
			min: {
				type: Number,
				default: 0,
				required: false
			},
			max: {
				type: Number,
				default: 100,
				required: false
			},
			interval: {
				type: Number,
				default: 1,
				required: false
			},
			disabled: {},
			value: {}
		},

		computed: {

			ownValue: {
				get: function () {
					return this.value;
				},
				set: function (value) {
					this.$emit('update:value', value);
				}
			},

			color: function () {
				return this.disabled ? config.styles.colorLightgrey : config.styles.colorLink;
			},

			classes: function () {
				return composeClassnames({
					enabled: !this.disabled,
					disabled: this.disabled
				}, 'view-slider');
			}

		}

	};

</script>

<template>
	<vue-slider-component
		class="view-slider"
		:class="classes"

		:min="min"
		:max="max"
		:interval="interval"
		:disabled="disabled ? true : false"
		:lazy="true"
		tooltip="hover"

		:style="{
			paddingLeft: 0,
			paddingRight: 0
		}"

		:sliderStyle="{}"

		:tooltipStyle="{}"

		:processStyle="{}"

		v-model="ownValue"

		></vue-slider-component>
</template>

<style lang="scss">
	@import '~@shared-styles';

	.view-slider {

		.vue-slider-dot {
			@include border-box;
			@include shadow-tight;
			border-width: 1px;
			border-color: $color-dark-translucent;
			@include background-clip-padding-box;
		}

		// NOTE: extra wrapper class required for specificity
		&.vue-slider-wrap {
			.vue-slider {
				background-color: $color-dark-translucent;
			}
		}

		.vue-slider-tooltip-top {
			top: -8px;
		}

		.vue-slider-tooltip-bottom {
			bottom: -8px;
		}

		.vue-slider-tooltip {
			@include radius;
			min-width: 0;
			@include pad-horizontal;
			@include pad-tight-vertical;
			@include type-discreet-small;
			border-width: 0;
			color: $color-white;
			&:before {
				display: none;
			}
		}

	}

	.view-slider-enabled {

		// NOTE: extra wrapper class required for specificity
		&.vue-slider-wrap {
			@include cursor-pointer;
		}

		.vue-slider-process {
			background-color: $color-link;
		}

		.vue-slider-tooltip {
			background-color: $color-dark;
		}

	}

	.view-slider-disabled {

		// NOTE: extra wrapper class required for specificity
		&.vue-slider-wrap {
			&.vue-slider-disabled {
				@include cursor-inherit;
				opacity: 1;
			}
		}

		.vue-slider-process {
			background-color: $color-grey;
		}

		.vue-slider-tooltip {
			background-color: $color-grey;
		}

	}

	// .view-slider-enabled {}

	// .view-slider-disabled {}

</style>
