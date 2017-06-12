
<!--

Wrapper component to be used as a hit area. Using this makes it easier to style and control a hit area separately from the control visualisation inside it, for example in table rows

This input is used by passing v-model="someValue"
Internally this translates to two-way use of `value` prop
State of the input is kept track of internally, and the result is $emitted to parent scope
http://vuejs.org/guide/components.html#Form-Input-Components-using-Custom-Events

-->

<script>

	// Utilities
	import { dom } from '@util';

	// View model
	export default {
		name: 'toggle',

		model: {
			prop: 'value',
			event: 'update'
		},

		props: [
			'value',
			'disabled'
		],

		data: function () {
			return {
				mouseDown: false
			};
		},

		computed: {

			// Writable computed
			// NOTE: This guy handles emitting out of component scope, which makes 2-way binding work
			isOn: {
				get: function () {
					return this.value;
				},
				set: function (value) {
					this.$emit('update', value);
				}
			},

			classes: function () {

				// Utility classes
				var componentClasses = dom.composeClassnames({
					on: this.isOn,
					off: !this.isOn,
					enabled: !this.disabled,
					disabled: this.disabled
				}, 'view-toggle');

				// Normal component classes
				return componentClasses.concat(dom.extractClassnames({
					'control-enabled': !this.disabled,
					'control-disabled': this.disabled,
					'control-mouse-down': this.mouseDown
				}));

			}

		},

		methods: {

			toggleOn: function () {
				if (!this.isOn) {
					this.isOn = true;
				}
				return this;
			},

			toggleOff: function () {
				if (this.isOn) {
					this.isOn = false;
				}
				return this;
			},

			toggle: function () {
				return this.isOn ? this.toggleOff() : this.toggleOn();
			},

			onMouseDown: function () {
				this.mouseDown = true;
			},

			onMouseUp: function () {
				this.mouseDown = false;
			},

			onClick: function () {
				if (!this.disabled) {
					this.toggle();
				}
				return this;
			}

		}

	};

</script>

<template>
	<div class="view-toggle control" :class="classes" @click="onClick" @mousedown="onMouseDown" @mouseup="onMouseUp"><slot></slot></div>
</template>

<style lang="scss">
	@import '~@shared-styles';

	.view-toggle {
		@include transition-hover-active;
		@include transition-properties-common;
	}

	.view-toggle-enabled {
		@include cursor-pointer;

		// Default feedback for click hitareas
		// NOTE: might be better not to set anything here since this might need a lot of overriding in many places
		&:active {
			background-color: $color-feedback-dark;
		}

	}

</style>
