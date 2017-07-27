<script>
	import { composeClassnames } from '@util';

	import { popovers } from '@services';

	export default {
		name: 'popovers',

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
				return composeClassnames({
					inPlace: popovers.isInPlace,
					on: this.component,
					off: !this.component
				}, 'view-popovers');
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

	<div class="view-popovers" :class="classes">
		<div class="view-popovers-content" :style="positionStyleBinding">
			<div class="view-popovers-content-relative">

				<!--This allows us to transition from one component to another while this wrapper is still active-->
				<fade>
					<component :is="component" :key="key"></component>
				</fade>

			</div>
		</div>
		<div class="view-popovers-overlay" @click="onOverlayClick"></div>
	</div>

</template>



<style lang="scss">
	@import '~@shared-styles';



	// Base styling

	.view-popovers {
		overflow: hidden;
	}

	.view-popovers-content {
		@include border-box;
		@include limit-small;
		position: absolute;
		z-index: 2;
		// overflow: hidden;
	}

	.view-popovers-content-relative {
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

	.view-popovers-overlay {
		@include fill;
		z-index: 1;
		background-color: $color-overlay;
	}



	// On-off states

	// .view-popovers-on {}

	// .view-popovers-off {}



	// In-place popover vs. modal design

	.view-popovers-in-place {

		.view-popovers-content {
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
		.view-popovers-overlay {
			background-color: transparent;
		}

	}

	.view-popovers-not-in-place {

		.view-popovers-content {
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

		.view-popovers-content-relative {
			@include keep-center;
			min-height: 16em;
			max-height: 100%;

			@include viewport-over-tiny {
				@include radius-loose;
			}

		}

	}

</style>
