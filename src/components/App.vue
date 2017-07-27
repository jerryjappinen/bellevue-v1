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
	import { auth, notifications, panels, popovers } from '@services';

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
				if (this.routeIsValid) {
					return this.$t('pageTitles.' + this.$route.name) + ' – ' + config.meta.title;
				}
				return config.meta.title;
			},

			// NOTE: route names are NOT user-facing. They can be used as localisation keys though.
			titlebarTitle: function () {
				if (this.routeIsValid) {
					return this.$t('pageTitles.' + this.$route.name);
				}
				return config.meta.title;
			},



			// Checks to guard against normal page navigation

			routeIsValid: function () {
				return this.$route.matched.length > 0 ? true : false;
			},

			// Uncomment this if you want to always require a connection for using the app
			// offlinePageShouldBeShown: function () {
			// 	// return network.isOffline ? true : false;
			// },

			// Current user is set but does not have privileges
			// NOTE: for public pages it's better to show 404, but for it's OK to tell an authenticated user if they're lacking permissions
			noAccessPageShouldBeShown: function () {
				if (auth.isConfirmed && !auth.canAccessRoute(this.$route.name)) {
					return true;
				}
				return false;
			},

			// No component set for this route, or (guest) user does not have access rights
			notFoundPageShouldBeShown: function () {
				if (!auth.isLoading && (!this.routeIsValid || !auth.canAccessRoute(this.$route.name))) {
					return true;
				}
				return false;
			},

			// NOTE: be careful here - user will see nothing except a loading indicator when this is true
			routerViewShouldBeShown: function () {
				return !auth.isLoading ? true : false;
			},

			// NOTE: if none of the above matches, fallback is shown (see the template below)



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
				return !(
					// this.offlinePageShouldBeShown ||
					this.panelShouldBeShown ||
					(this.popoverShouldBeShown && !popovers.isInPlace)
				) ? true : false;
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
		<custom-transition name="hide-right">
			<notification v-if="notificationShouldBeShown"></notification>
		</custom-transition>

		<!-- Popover elements will be rendered here in the structure regardless of their positioning -->
		<fade>
			<popovers v-if="popoverShouldBeShown"></popovers>
		</fade>

		<!-- Panels will be rendered here when they open -->
		<fade>
			<panels v-if="panelShouldBeShown"></panels>
		</fade>

		<!-- Title bar -->
		<custom-transition name="hide-up" appear>
			<titlebar v-if="titlebarShouldBeShown" :title="titlebarTitle"></titlebar>
		</custom-transition>

		<!-- Main content area that can be padded -->
		<div class="view-app-content">

			<!-- First-level router view -->
			<fade appear>

				<!-- Offline -->
				<!-- <page-offline v-if="offlinePageShouldBeShown"></page-offline> -->

				<!-- User is logged in but missing access rights -->
				<page-no-access v-if="noAccessPageShouldBeShown"></page-no-access>

				<!-- No page like this, or no access with these privileges -->
				<page-not-found v-else-if="notFoundPageShouldBeShown"></page-not-found>

				<!-- Normal pages will be rendered here -->
				<router-view v-else-if="routerViewShouldBeShown"></router-view>

				<!-- Fallback -->
				<ellipsis v-else class="view-app-loading"></ellipsis>

			</fade>

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
	@import '~@shared-styles';



	// NOTE
	//
	// Positioning for high-level layout elements
	// - We do this here instead of in each component so we have one place where we see an overview
	// - This component in general is in charge of layout orchestration
	// - Also each sub component should not be concerned about the parent context, i.e. positioning on the screen
	//
	// Restricting body scrolling
	//
	// - This scales this top-level component to fill the entire viewport
	// - This means that body and .view-app won't scroll, but .view-app-content will
	// - Other elements like titlebar and panels can be absolutely positioned instead of fixed
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

	// NOTE: calc() here is runtime
	$titlebar-height: calc(1em + (2 * #{$buffer-tight}) + 6px);

	.view-app {
		@include fill;
		overflow: hidden;
		height: 100%;
		max-height: 100%;

		.view-notification {
			position: absolute;
			// position: fixed;
			top: $titlebar-height;
			right: 1em;
			margin-top: 1em;
		}

		.view-popovers {
			@include fill;
		}

		.view-popover-not-in-place {
			// @include fill-fixed;
			@include fill;
		}

		.view-panels {
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

	.view-app {

		// Stacking order of layout elements

		.view-notification {
			z-index: $z-notifications;
		}

		.view-popovers {
			z-index: $z-popovers;
		}

		.view-panels {
			z-index: $z-panels;
		}

		.view-titlebar {
			z-index: $z-titlebar;
		}

	}

	// Required for titlebar spacing
	.view-app-content {
		padding-top: $titlebar-height;
	}

	.view-app-loading {
		display: block;
		@include keep-center;
		@include buffer-loose-even;
		text-align: center;
		transform: scale(2);
		@include type-discreet;
	}

</style>
