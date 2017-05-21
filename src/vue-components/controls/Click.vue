
<!--

Wrapper component to be used as a hit area. Using this makes it easier to style and control a hit area separately from the control visualisation inside it, for example in table rows

This input is used by passing v-model="someValue"
Internally this translates to two-way use of `value` prop
State of the input is kept track of internally, and the result is $emitted to parent scope
http://vuejs.org/guide/components.html#Form-Input-Components-using-Custom-Events

-->

<script>

	// Utilities
	import util from '@util';

	// View model
	export default {
		name: 'click',

		props: [
			'callback',
			'disabled'
		],

		computed: {

			classes: function () {
				return util.dom.composeClassnames({
					enabled: !this.disabled,
					disabled: this.disabled
				}, 'view-click');
			}

		},

		methods: {

			onClick: function (event) {
				if (!this.disabled) {
					this.callback(event);
				}
			}

		}

	};

</script>

<template>
	<div class="view-click" :class="classes" @click="onClick"><slot></slot></div>
</template>

<style lang="scss">
	@import '~@styles/shared.scss';

	.view-click {
		@include transition-hover-active;
		@include transition-properties-common;
	}

	.view-click-enabled {
		@include cursor-pointer;

		// Default feedback for click hitareas
		// NOTE: might be better not to set anything here since this might need a lot of overriding in many places
		&:active {
			background-color: $color-feedback-dark;
		}

	}

	// .view-click-disabled {}

</style>
