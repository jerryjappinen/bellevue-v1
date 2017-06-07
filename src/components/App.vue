<script>

	// Global styles
	// http://vuejs-templates.github.io/webpack/pre-processors.html

	// NOTE
	// - URL resolving will handle the URL correctly
	// - Webpack will compile SCSS
	// - Target file is a manifest, which imports the actual global styles
	// - You will get weird vue-style-loader issues in case the path is wrong

	// FIXME
	// - Style utilities should be included AFTER all component code.
	// - This is because we want their specificity is higher than a lone component class's by default.
	// - But here, from vue-loader's perspective, utilities are part of this component's code.
	// - ...so other component styles will be injected AFTER the utilities in this case, which is not what we want.
	// - We can use index.html but the injections there are magical and compilation won't trigger the same way.
	import '@styles/global';
	import '@styles/utilities';



	// Services
	import { notifications, panels, popovers } from '@services';

	// Config
	import config from '@config';



	// NOTE
	//
	// This is our app's root component. We should keep this as simple as possible, it should probably only render child components.

	export default {

		// We need to use names in order for recursive components to work, so better to just keep it consistent
		// NOTE: Vue will standardize the casing, but we'll use the same casing as in file names here
		name: 'app',

		metaInfo: function () {

			// NOTE
			// - route names shouldn't be used in the UI like this
			// - BUT: we could use them as keys, as this should go through localisation anyway
			return {
				title: this.pageTitle
			};

		},

		// data: function () {
		// 	return {};
		// },

		computed: {

			// Meta information

			pageTitle: function () {
				return this.$route.name + ' – ' + config.meta.title;
			},

			titlebarTitle: function () {
				// FIXME: route names are not supposed to be user-facing. They can be used as localisation keys though.
				return 'titlebar.' + this.$route.name;
			},



			// Orchestrate layout elements

			notificationShouldBeShown: function () {
				return notifications.shouldBeShown ? true : false;
			},

			panelShouldBeShown: function () {
				return panels.shouldBeShown ? true : false;
			},

			popoverShouldBeShown: function () {
				return popovers.shouldBeShown ? true : false;
			},

			titlebarShouldBeShown: function () {
				return (this.popoverShouldBeShown && !popovers.isInPlace) ? false : true;
			}

		}

	};

</script>



<template>

	<div class="view-app">

		<!-- Notifications -->
		<transition name="transition-hide-right" mode="out-in">
			<notification v-if="notificationShouldBeShown"></notification>
		</transition>

		<!-- Panels will be rendered here when they open -->
		<transition name="transition-fade" mode="out-in">
			<panel v-if="panelShouldBeShown"></panel>
		</transition>

		<!-- Popover elements will be rendered here in the structure regardless of their positioning -->
		<transition name="transition-fade" mode="out-in">
			<popover v-if="popoverShouldBeShown"></popover>
		</transition>

		<!-- Title bar -->
		<transition name="transition-hide-up" appear>
			<titlebar v-if="titlebarShouldBeShown" :title="titlebarTitle"></titlebar>
		</transition>

		<!-- Main content area that can be padded -->
		<div class="view-app-content">

			<!-- First-level router view -->
			<transition name="transition-fade" mode="out-in" appear>
				<!--<keep-alive>-->
					<router-view></router-view>
				<!--</keep-alive>-->
			</transition>

		</div>
	</div>

</template>



<style lang="scss">
	// Root component styles

	// NOTE
	//
	// - We're manually prefixing our component-specific class names with `view-`
	// - This makes it easier to distinguish between state classes, component-specific classes and utility classes.
	// - This is especially helpful when overriding styles of child components in parents.
	// - For some reason, @import will require '~' when using an alias (defined in Webpack's configuration, in the resolve section)

	// FIXME
	//
	// - Do I really need this in every component definition?
	// - This is just manual duplication that leads to mistakes.
	@import '~@styles/shared';

	// Required for titlebar spacing
	// FIXME: hacky solution, can't be transitioned and is not 100 % accurate
	.view-app {
		padding-top: 1em + (2 * $buffer-tight);

		.view-notification {
			z-index: $z-indicators;
		}

		.view-panel {
			z-index: $z-panels;
		}

		.view-popover {
			z-index: $z-popovers;
		}

		.view-titlebar {
			z-index: $z-titlebar;
		}

	}

	.view-app-content {
		margin-top: 6px; // Titlebar link borders
		@include buffer-relative;
	}

	.view-app-logo {
		display: inline-block;
		width: 2em;
	}

	// NOTE: clearly this stuff should be in a separate component
	.view-app-menu {

		// FIXME: lots of nesting, which is bad
		li {
			@include inline-block;

			&:not(:last-of-type) {
				@include push-tight-right;
			}

			&:not(:first-of-type) {
				@include push-tight-left;
			}

			a {
				@include pad;

				// NOTE: we try to use a small set of prefixes like .is-, .not-, .has-, or .no- in our state classes
				&.is-exact-active {
					text-decoration: underline;
				}

			}

		}

	}

</style>
