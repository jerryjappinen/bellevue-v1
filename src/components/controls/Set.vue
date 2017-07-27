
<!--

Wrapper component to be used as a hit area. Using this makes it easier to style and control a hit area separately from the control visualisation inside it, for example in table rows

This input is used by passing the value attribute with `.sync` modifier
Internally this translates to two-way use of `value` prop
State of the input is kept track of internally, and the result is $emitted to parent scope
http://vuejs.org/guide/components.html#Form-Input-Components-using-Custom-Events

-->

<script>
	import { isUndefined } from 'lodash';
	import { composeClassnames, extractClassnames } from '@util';

	export default {
		name: 'set',

		props: {
			value: {},
			disabled: {},
			to: {},
			feedback: {
				type: String,
				required: false,
				default: 'scale'
			}
		},

		data: function () {
			return {
				defaultValue: true,
				mouseDown: false
			};
		},

		computed: {

			// Writable computed
			// NOTE: This guy handles emitting out of component scope, which makes 2-way binding work
			ownValue: {
				get: function () {
					return this.value;
				},
				set: function (value) {
					this.$emit('update:value', value);
				}
			},

			targetValue: function () {
				if (!isUndefined(this.to)) {
					return this.to;
				}
				return this.defaultValue;
			},

			isOn: function () {
				return this.value === this.to ? true : false;
			},

			classes: function () {

				// Normal component classes
				let componentClasses = composeClassnames({
					on: this.isOn,
					off: !this.isOn,
					enabled: !this.disabled,
					disabled: this.disabled
				}, 'view-set');

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

			onMouseDown: function () {
				this.mouseDown = true;
			},

			onMouseUp: function () {
				this.mouseDown = false;
			},

			onClick: function () {
				if (!this.disabled) {
					this.ownValue = this.targetValue;
				}
				return this;
			}

		}

	};

</script>

<template>
	<span class="view-set inline-block control" :class="classes" @click="onClick" @mousedown="onMouseDown" @mouseup="onMouseUp"><slot></slot></span>
</template>

<style lang="scss">
	@import '~@shared-styles';
</style>
