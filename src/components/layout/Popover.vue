<script>

	// Custom utilities
	import { dom } from '@util';

	// Services
	import { popovers } from '@services';

	export default {
		name: 'popover',

		computed: {

			component: function () {
				return popovers.component;
			},

			// NOTE: this won't trigger transition if reopening the popup with the same component
			key: function () {
				return 'popover-' + this.component;
			},



			// Binding helpers

			classes: function () {
				return dom.composeClassnames({
					inPlace: popovers.isInPlace,
					on: this.component,
					off: !this.component
				}, 'view-popover');
			},

			positionStyleBinding: function () {
				if (popovers.isInPlace) {
					return {
						transform: 'translate3d(' + popovers.targetCoordinates.x + 'px, ' + popovers.targetCoordinates.y + 'px, 0)'
					};
				}
			}

		},

		methods: {

			clickIsOnOutside: function (event) {
				// event.target vs. event.currentTarget
				// event.target.contains() ??
				// event.target.parentNode ??
			},

			close: function () {
				popovers.close();
			},

			onOverlayClick: function () {
				this.close();
			},

			onClick: function () {
				if (this.clickIsOnOutside) {
					this.close();
				}
			}

		},

		watch: {

		},

		created: function () {

		},

		beforeDestroy: function () {

		}

	};

</script>



<template>

	<div class="view-popover" :class="classes">
		<div class="view-popover-content" :style="positionStyleBinding">
			<div class="view-popover-content-relative">

				<!--This allows us to transition from one component to another while this wrapper is still active-->
				<transition name="transition-fade-snap" mode="out-in">

					<!-- FIXME: how to pass propsData to child component? -->
					<component :is="component" :key="key"></component>

				</transition>

			</div>
		</div>
		<div class="view-popover-overlay" @click="onOverlayClick"></div>
	</div>

</template>



<style lang="scss">
	@import '~@styles/shared.scss';



	// Base styling

	.view-popover {
		@include fill;
		z-index: $z-popovers;
		overflow: hidden;
	}

	.view-popover-content {
		@include border-box;
		@include limit-small;
		position: absolute;
		z-index: 2;
		overflow: hidden;
	}

	.view-popover-content-relative {
		@include border-box;
		@include fill-relative;
		overflow: auto;
		@include clear-after;

		border-width: 1px;
		border-color: $color-dark-translucent;
		background-color: $color-white;
		@include background-clip-padding-box;
		@include radius;
		@include shadow;
	}

	.view-popover-overlay {
		@include fill;
		z-index: 1;
		background-color: color-translucent($color-dark, 0.05);
	}



	// On-off states

	// .view-popover-on {}

	// .view-popover-off {}



	// In-place popover vs. modal design

	.view-popover-in-place {

		.view-popover-content {
			@include transform-origin-top-left;
			max-height: 12em;

			// // Whoops, I don't want this
			// > * {
			// 	position: relative;
			// }

		}

		.view-popover-overlay {
			position: fixed;
		}

	}

	.view-popover-not-in-place {
		@include fill-fixed;

		.view-popover-content {
			@include keep-full-center;
			height: 90%;
		}

		.view-popover-content-relative {
			@include keep-center;
			width: 90%;
			max-height: 100%;
			@include radius-loose;
		}

		.view-popover-overlay {
			background-color: color-translucent($color-dark, 0.15);
		}

	}

</style>
