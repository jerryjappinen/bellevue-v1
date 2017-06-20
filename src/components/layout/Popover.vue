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

			// NOTE: this won't trigger transition if reopening the same component
			key: function () {
				return 'popover-' + this.component;
			},

			// overlayIsShown: function () {
			// 	return !popovers.isInPlace;
			// },



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

			// clickIsOnOutside: function (event) {
			// 	// event.target vs. event.currentTarget
			// 	// event.target.contains() ??
			// 	// event.target.parentNode ??
			// },

			close: function () {
				popovers.close();
			},

			// onClick: function () {
			// 	if (util.events.clickIsOnOutside(this.$el)) {
			// 		this.close();
			// 	}
			// }

			onOverlayClick: function () {
				this.close();
			}

		}

		// watch: {},

		// created: function () {},

		// beforeDestroy: function () {}

	};

</script>



<template>

	<div class="view-popover" :class="classes">
		<div class="view-popover-content" :style="positionStyleBinding">
			<div class="view-popover-content-relative">

				<!--This allows us to transition from one component to another while this wrapper is still active-->
				<transition name="transition-fade" mode="out-in">

					<!-- FIXME: how to pass propsData to child component? -->
					<component :is="component" :key="key"></component>

				</transition>

			</div>
		</div>
		<div class="view-popover-overlay" @click="onOverlayClick"></div>
	</div>

</template>



<style lang="scss">
	@import '~@shared-styles';



	// Base styling

	.view-popover {
		overflow: hidden;
	}

	.view-popover-content {
		@include border-box;
		@include limit-small;
		position: absolute;
		z-index: 2;
		// overflow: hidden;
	}

	.view-popover-content-relative {
		@include border-box;
		@include fill-relative;
		overflow: auto;
		@include clear-after;

		background-color: $color-white;
		@include shadow;

		@include viewport-over-tiny {
			@include radius;
		}

	}

	.view-popover-overlay {
		@include fill;
		z-index: 1;
		background-color: $color-overlay;
	}



	// On-off states

	// .view-popover-on {}

	// .view-popover-off {}



	// In-place popover vs. modal design

	.view-popover-in-place {

		.view-popover-content {
			@include transform-origin-top-left;
			min-width: 8em;
			max-width: 24em;
			max-height: 12em;

			// // Whoops, I don't want this
			// > * {
			// 	position: relative;
			// }

		}

		// FIXME: we don't have accurate view handling yet so we have to have an invisible overlay
		.view-popover-overlay {
			background-color: transparent;
		}

	}

	.view-popover-not-in-place {

		.view-popover-content {
			position: absolute;
			top: 0;
			left: 50%;

			width: 100%;
			max-height: 80%;

			transform: translate3d(-50%, 0, 0);

			@include viewport-over-tiny {
				top: 50%;
				width: 90%;
				max-height: 90%;
				transform: translate3d(-50%, -50%, 0);
			}

		}

		.view-popover-content-relative {
			@include keep-center;
			min-height: 16em;
			max-height: 100%;

			@include viewport-over-tiny {
				@include radius-loose;
			}

		}

	}

</style>
