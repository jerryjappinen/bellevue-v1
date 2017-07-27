
<script>

	// View model
	export default {
		name: 'spinner',

		// directives: {},

		// components: {},

		// data: function () {
		// 	return {};
		// },

		props: {

			// Pixels
			width: {
				type: Number,
				default: (24 * 2)
			},

			// In pixels, when displayed at 1:1 width
			strokeWidth: {
				type: Number,
				default: 4
			}

		},

		computed: {

			viewBox: function () {
				return '0 0 ' + this.width + ' ' + this.width;
			},

			strokeWidthValue: function () {
				return this.strokeWidth + 'px';
			},

			radius: function () {
				return ((this.width / 2) - this.strokeWidth) + 'px';
			},

			circlePosition: function () {
				return (this.width / 2) + 'px';
			}

		},

		methods: {}

	};

</script>

<template>

	<svg class="view-spinner"
		role="img"
		title="Loading..."
		:viewBox="viewBox"
		:width="this.width + 'px'"
		:height="this.width + 'px'">
		<circle class="view-spinner-circle"
			:cx="circlePosition"
			:cy="circlePosition"
			:r="radius"
			:stroke-width="strokeWidthValue">
		</circle>
	</svg>

</template>

<style lang="scss">
	@import '~@shared-styles';

	$spinnerSize: 48;
	$spinnerRadius: ($spinnerSize / 2) * 1px;

	.view-spinner-circle {
		fill: transparent;
		stroke: currentColor;

		stroke-dasharray: (3.14 * $spinnerSize) * 1px;
		stroke-dashoffset: 0;
		stroke-linecap: round;

		transform-origin: $spinnerRadius $spinnerRadius 0;

		@include animation(view-spinner-circle, 4s, linear);
	}

	@keyframes view-spinner-circle {

		0% {
			stroke-dashoffset: (0.66 * $spinnerSize) * 1px;
			transform: rotate(0deg);
		}

		50% {
			stroke-dashoffset: (3.14 * $spinnerSize) * 1px;
			transform: rotate(720deg);
		}

		100% {
			stroke-dashoffset: (0.66 * $spinnerSize) * 1px;
			transform: rotate(1080deg);
		}

	}

</style>
