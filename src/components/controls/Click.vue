
<!--
Wrapper component to be used as a hit area. Using this makes it easier to style and control a hit area separately from the control visualisation inside it, for example in table rows
-->

<script>
	import { composeClassnames, extractClassnames } from '@util';

	export default {
		name: 'click',

		props: {
			callback: {
				type: Function,
				required: true
			},
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

			classes: function () {

				// Normal component classes
				let componentClasses = composeClassnames({
					enabled: !this.disabled,
					disabled: this.disabled
				}, 'view-click');

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

			onClick: function (event) {
				if (!this.disabled) {
					this.callback(event);
				}
			}

		}

	};

</script>

<template>
	<span class="view-click inline-block control" :class="classes" @click="onClick" @mousedown="onMouseDown" @mouseup="onMouseUp"><slot></slot></span>
</template>

<style lang="scss">
	// @import '~@shared-styles';
</style>
