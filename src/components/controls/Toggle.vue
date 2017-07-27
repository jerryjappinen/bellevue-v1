
<!--

Wrapper component to be used as a hit area. Using this makes it easier to style and control a hit area separately from the control visualisation inside it, for example in table rows

This input is used by passing the value attribute with `.sync` modifier
Internally this translates to two-way use of `value` prop
State of the input is kept track of internally, and the result is $emitted to parent scope
http://vuejs.org/guide/components.html#Form-Input-Components-using-Custom-Events

-->

<script>
	import { composeClassnames, extractClassnames } from '@util';

	export default {
		name: 'toggle',

		props: {
			value: {},
			disabled: {},
			feedback: {
				type: String,
				required: false,
				default: 'scale'
			}
		},

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
					this.$emit('update:value', value);
				}
			},

			classes: function () {

				// Normal component classes
				let componentClasses = composeClassnames({
					on: this.isOn,
					off: !this.isOn,
					enabled: !this.disabled,
					disabled: this.disabled
				}, 'view-toggle');

				// Utility classes
				let utilityClasses = {
					'control-enabled': !this.disabled,
					'control-disabled': this.disabled,
					'control-mouse-down': this.mouseDown
				};

				// Apply feedback utility class conditionally
				if (this.feedback) {
					utilityClasses['control-' + this.feedback] = true;
				}

				utilityClasses = extractClassnames(utilityClasses);

				// Apply all
				return componentClasses.concat(utilityClasses);

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
	<span class="view-toggle inline-block control" :class="classes" @click="onClick" @mousedown="onMouseDown" @mouseup="onMouseUp"><slot></slot></span>
</template>

<style lang="scss">
	// @import '~@shared-styles';
</style>
