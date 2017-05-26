
<!--

Wrapper component to be used as a hit area. Using this makes it easier to style and control a hit area separately from the control visualisation inside it, for example in table rows

This input is used by passing v-model="someValue"
Internally this translates to two-way use of `value` prop
State of the input is kept track of internally, and the result is $emitted to parent scope
http://vuejs.org/guide/components.html#Form-Input-Components-using-Custom-Events

-->

<script>

	// Utilities
	import _ from 'lodash';
	import util from '@util';

	// View model
	export default {
		name: 'set',

		model: {
			prop: 'value',
			event: 'update'
		},

		props: [
			'value',
			'disabled',
			'to'
		],

		data: function () {
			return {
				defaultValue: true
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
					this.$emit('update', value);
				}
			},

			targetValue: function () {
				if (!_.isUndefined(this.to)) {
					return this.to;
				}
				return this.defaultValue;
			},

			isOn: function () {
				return this.value === this.to ? true : false;
			},

			classes: function () {

				// Utility classes
				var componentClasses = util.dom.composeClassnames({
					on: this.isOn,
					off: !this.isOn,
					enabled: !this.disabled,
					disabled: this.disabled
				}, 'view-set');

				// Normal component classes
				return componentClasses.concat(util.dom.extractClassnames({
					'control-enabled': !this.disabled,
					'control-disabled': this.disabled
				}));

			}

		},

		methods: {

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
	<div class="view-set" :class="classes" @click="onClick"><slot></slot></div>
</template>

<style lang="scss">
	@import '~@styles/shared';

	.view-set {
		@include transition-hover-active;
		@include transition-properties-common;
	}

	.view-set-enabled {
		@include cursor-pointer;

		// Default feedback for click hitareas
		// NOTE: might be better not to set anything here since this might need a lot of overriding in many places
		&:active {
			background-color: $color-feedback-dark;
		}

	}

</style>
