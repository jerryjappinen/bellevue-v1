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

			persist: {
				get: function () {
					return {
						panelComponent: panels.component,
						route: this.$route.name
					};
				},
				set: function (persist) {

					// Reopen panel if user reloaded the page
					if (persist.route === this.$route.name) {
						panels.open(persist.panelComponent);
					}

				}
			},



			// Meta information

			pageTitle: function () {
				return this.$t('pageTitles.' + this.$route.name) + ' – ' + config.meta.title;
			},

			// NOTE: route names are NOT user-facing. They can be used as localisation keys though.
			titlebarTitle: function () {
				return this.$t('pageTitles.' + this.$route.name);
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
				return !(this.panelShouldBeShown || (this.popoverShouldBeShown && !popovers.isInPlace)) ? true : false;
			}

		},

		watch: {

			// When navigating, close popovers and panels
			'$route': function () {
				panels.close();
				popovers.close();
			}

		},

		created: function () {

			// Hack to enable :active CSS on iOS
			// https://css-tricks.com/snippets/css/remove-gray-highlight-when-tapping-links-in-mobile-safari/
			window.document.addEventListener('touchstart', function () {}, true);

		}

	};

</script>



<template>

	<div class="view-app">

		<!-- Notifications -->
		<transition name="transition-hide-right" mode="out-in">
			<notification v-if="notificationShouldBeShown"></notification>
		</transition>

		<!-- Popover elements will be rendered here in the structure regardless of their positioning -->
		<transition name="transition-fade" mode="out-in">
			<popover v-if="popoverShouldBeShown"></popover>
		</transition>

		<!-- Panels will be rendered here when they open -->
		<transition name="transition-fade" mode="out-in">
			<panel v-if="panelShouldBeShown"></panel>
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
	@import '~@shared-styles';



	// NOTE
	//
	// Positioning and stack order for high-level layout elements
	// This scales this top-level component to fill the entire viewport
	// This means that body and .view-app won't scroll, but .view-app-content will
	// Other elements like titlebar and panels can be absolutely positioned instead of fixed
	//
	// If you want body to scroll (works better for some apps):
	// - remove the height and overflow limitations below
	// - use fixed for floating elements instead of absolute

	html,
	body {
		// overflow: hidden; // Uncomment to DISABLE the rubber band effect when scrolling to page edges on desktop
		height: 100%;
		max-height: 100%;
	}

	.view-app {
		@include fill;
		overflow: hidden;
		height: 100%;
		max-height: 100%;

		.view-notification {
			position: absolute;
			// position: fixed;
			top: 1em;
			right: 1em;
		}

		.view-popover {
			@include fill;
		}

		.view-popover-not-in-place {
			// @include fill-fixed;
			@include fill;
		}

		.view-panel {
			// @include fill-fixed;
			@include fill;
		}

		.view-titlebar {
			// @include fill-width-fixed;
			@include fill-width;
			top: 0;
		}

	}

	.view-app-content {
		@include fill-relative;
		overflow: auto;
		max-height: 100%;
	}



	// Required for titlebar spacing
	// FIXME: hacky solution, can't be transitioned and is not 100 % accurate
	.view-app {
		padding-top: 1em + (2 * $buffer-tight);

		// Stacking order of layout elements
		.view-notification {
			z-index: $z-notifications;
		}

		.view-popover {
			z-index: $z-popovers;
		}

		.view-panel {
			z-index: $z-panels;
		}

		.view-titlebar {
			z-index: $z-titlebar;
		}

	}

	.view-app-content {
		margin-top: 6px; // Titlebar link borders
		@include buffer-relative;
	}

</style>
