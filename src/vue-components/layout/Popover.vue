<script>

	// Vendor
	import _ from 'lodash';

	// Custom utilities
	import util from '@util';

	// Services
	import { popovers, viewport } from '@services';

	export default {
		name: 'popover',

		data: function () {
			return {
				inPlaceMinViewportWidth: 800,
				inPlaceMinViewportHeight: 400
			};
		},

		computed: {

			component: function () {
				return popovers.component;
			},

			key: function () {
				return this.component;
			},

			inPlaceTarget: function () {
				return popovers.inPlaceTarget;
			},

			inPlaceTargetBox: function () {
				return popovers.inPlaceTargetBox;
			},

			targetCoordinates: _.throttle(function () {
				if (this.inPlaceTargetBox) {
					return {
						x: this.inPlaceTargetBox.x,
						y: this.inPlaceTargetBox.y
					};
				}
				return null;
			}, 1, { leading: true }),

			shouldRenderInPlace: function () {
				return this.targetCoordinates &&
					_.isNumber(this.targetCoordinates.x) &&
					_.isNumber(this.targetCoordinates.y) &&
					viewport.width > this.inPlaceMinViewportWidth &&
					viewport.height > this.inPlaceMinViewportHeight
						? true
						: false;
			},



			// Binding helpers

			classes: function () {
				return util.dom.composeClassnames({
					on: this.component,
					off: !this.component,
					inPlace: this.shouldRenderInPlace
				}, 'view-popover');
			},

			popoverStyleBinding: function () {
				if (this.shouldRenderInPlace) {
					return {
						transform: 'translate3d(' + this.targetCoordinates.x + 'px, ' + this.targetCoordinates.y + 'px, 0)'
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

	<div class="view-popover" :class="classes" :data-popover-component="component ? component : 'no component'">

		<!--This allows us to transition from one component to another while this wrapper is still active-->
		<transition name="transition-fade" mode="out-in">

			<!-- FIXME: how to pass propsData to child component? -->
			<component :is="component" :key="key"></component>

		</transition>
	</div>

</template>



<style lang="scss">
	@import '~@styles/shared.scss';

	.view-popover {
		z-index: $z-popovers;
	}

</style>
