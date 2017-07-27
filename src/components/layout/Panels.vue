<script>
	import { composeClassnames } from '@util';
	import { panels } from '@services';

	export default {
		name: 'panels',

		computed: {

			component: function () {
				return panels.component;
			},

			// NOTE: this won't trigger transition if reopening the same component
			key: function () {
				return 'panel-' + this.component;
			},

			classes: function () {
				return composeClassnames({
					on: this.component,
					off: !this.component
				}, 'view-panels');
			}

		},

		methods: {

			close: function () {
				panels.close();
			},

			onOverlayClick: function () {
				this.close();
			}

		}

	};

</script>



<template>

	<div class="view-panels" :class="classes">

		<!-- Close button -->
		<icon-button class="view-panels-close" icon="cross" :callback="close"></icon-button>

		<!-- Content area -->
		<div class="view-panels-content">
			<div class="view-panels-content-relative">

				<!--This allows us to transition from one component to another while this wrapper is still active-->
				<fade>
					<component :is="component" :key="key"></component>
				</fade>

			</div>
		</div>
		<div class="view-panels-overlay" @click="onOverlayClick"></div>
	</div>

</template>



<style lang="scss">
	@import '~@shared-styles';

	.view-panels {
		overflow: hidden;

		// FIXME: I'd like to have generic transition classes here even if I've chosen to use a named transition in the parent component
		&.transition-fade-enter {
			.view-panels-close {
				@include transition-delay-slow;
			}
		}

		&.transition-fade-enter,
		&.transition-fade-leave-to {
			@include transition-slow;

			.view-panels-close {
				opacity: 0;
				transform: scale($scale-verysmall);
			}

			.view-panels-content {
				@include translate-right;
				@include shadow-loose-transparent;
			}

		}

	}

	.view-panels-close {

		&.view-click-button {
			position: absolute;
		}

		top: 1em;
		right: 1em;
		z-index: 3;
		@include shadow;

		@include transition-properties-common;
		@include transition-medium;

		// @include viewport-over($width-body-loose + 4em) {
		// 	display: none;
		// }

	}

	.view-panels-content {
		@include border-box;
		@include clear-after;
		position: absolute;
		top: 0;
		right: 0;
		z-index: 2;
		overflow: hidden;

		width: $width-body-loose;
		max-width: 100%;
		height: 100%;
		@include shadow-loose;

		@include no-translate;
		@include transition-slow;
		@include transition-properties-common;
	}

	.view-panels-content-relative {
		@include fill-relative;
		overflow: auto;
		background-color: $color-white;
	}

	.view-panels-overlay {
		@include fill;
		z-index: 1;
		background-color: $color-overlay;
	}

</style>
