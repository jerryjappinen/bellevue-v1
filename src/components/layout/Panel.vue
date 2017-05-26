<script>

	// Custom utilities
	import { dom } from '@util';

	// Services
	import { panels } from '@services';

	export default {
		name: 'panel',

		computed: {

			component: function () {
				return panels.component;
			},

			// NOTE: this won't trigger transition if reopening the same component
			key: function () {
				return 'panel-' + this.component;
			},

			classes: function () {
				return dom.composeClassnames({
					on: this.component,
					off: !this.component
				}, 'view-panel');
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

	<div class="view-panel" :class="classes">
		<div class="view-panel-content">
			<div class="view-panel-content-relative">

				<!--This allows us to transition from one component to another while this wrapper is still active-->
				<transition name="transition-fade" mode="out-in">

					<!-- FIXME: how to pass propsData to child component? -->
					<component :is="component" :key="key"></component>

				</transition>

			</div>
		</div>
		<div class="view-panel-overlay" @click="onOverlayClick"></div>
	</div>

</template>



<style lang="scss">
	@import '~@styles/shared';

	.view-panel {
		@include fill-fixed;
		overflow: hidden;

		// FIXME: I'd like to have generic transition classes here even if I've chosen to use a named transition in the parent component
		&.transition-fade-enter,
		&.transition-fade-leave-to {

			.view-panel-content {
				@include translate-right;
			}

		}

	}

	.view-panel-content {
		@include border-box;
		@include clear-after;
		position: absolute;
		top: 0;
		right: 0;
		z-index: 2;
		overflow: hidden;

		width: 32em;
		max-width: 100%;
		height: 100%;

		@include no-translate;
		@include transition-slow;
		@include transition-properties-common;
	}

	.view-panel-content-relative {
		@include fill-relative;
		overflow: auto;
		background-color: $color-white;
	}

	.view-panel-overlay {
		@include fill;
		z-index: 1;
		background-color: $color-overlay;
	}

</style>
