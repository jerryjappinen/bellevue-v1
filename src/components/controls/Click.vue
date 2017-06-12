
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

		props: {
			callback: {
				type: Function,
				required: true
			},
			disabled: {}
		},

		data: function () {
			return {
				mouseDown: false
			};
		},

		computed: {

			classes: function () {

				// Utility classes
				var componentClasses = util.dom.composeClassnames({
					enabled: !this.disabled,
					disabled: this.disabled
				}, 'view-click');

				// Normal component classes
				return componentClasses.concat(util.dom.extractClassnames({
					'control-enabled': !this.disabled,
					'control-disabled': this.disabled,
					'control-mouse-down': this.mouseDown
				}));

			}

		},

		methods: {

			onMouseDown: function () {
				this.mouseDown = true;
			},

			onMouseUp: function () {
				this.mouseDown = false;
			},

			onClick: function (event) {
				if (!this.disabled) {
					this.callback(event);
				}
			}

		}

	};

</script>

<template>
	<div class="view-click control" :class="classes" @click="onClick" @mousedown="onMouseDown" @mouseup="onMouseUp"><slot></slot></div>
</template>

<style lang="scss">
	@import '~@shared-styles';

	// .view-click {}
	// .view-click-enabled {}
	// .view-click-disabled {}

	.view-click-mouse-down {
		user-select: none;
	}

</style>
