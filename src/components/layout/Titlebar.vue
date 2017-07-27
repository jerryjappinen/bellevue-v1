<script>
	import { composeClassnames, eventHasMetaKey, trimWhitespace } from '@util';
	import {
		api,
		auth,
		// env,
		network,
		notifications,
		panels,
		popovers
	} from '@services';
	import config from '@config';

	export default {
		name: 'titlebar',

		props: {
			title: {
				type: String,
				required: false
			}
		},

		computed: {

			// logoutPath: function () {
			// 	return env.currentRemote.logoutPath;
			// },

			appTitle: function () {
				return config.meta.title;
			},

			appIcon: function () {
				// return env.isDevelopment ? 'test-tube' : 'app-icon';
				return 'app-icon';
			},

			titleToRender: function () {
				if (this.title) {
					var title = trimWhitespace(this.title);
					if (title.length) {
						return title;
					}
				}
				return config.meta.title;
			},



			apiSpinnerVisible: function () {
				return api.isOperating;
			},



			isLoggedIn: function () {
				return auth.currentAccount ? true : false;
			},

			currentAccountName: function () {
				return auth.currentAccount ? auth.currentAccount.nameOrEmail : '';
			},

			currentAccountAvatarUrl: function () {
				return auth.currentAccount ? auth.currentAccount.avatarUrl : '';
			},



			isOffline: function () {
				return network.isOffline;
			},

			classes: function () {
				return composeClassnames({
					isOffline: this.isOffline
				}, 'view-titlebar');
			}

		},

		methods: {

			showAccountNotification: function () {
				notifications.show(this.currentAccountName + ' (' + auth.currentAccount.email + ')');
			},

			// exit: function () {
			// 	auth.unsetcurrentAccount();
			// },

			openReadme: function () {
				panels.open('PanelReadme');
			},

			onMenuTriggerClick: function (event) {

				// FIXME: This should be written as a custom modifier for Vue if possible
				// E.g. @click.meta="onMenuTriggerClick"
				if (!eventHasMetaKey(event)) {
					event.preventDefault();
					popovers.open('PopoverMainMenu');
				}

			}

		}

	};

</script>

<template>

	<div class="view-titlebar" :class="classes">

		<!-- Hamburger menu link -->
		<ul class="view-titlebar-list-primary hide-over-small">
			<li class="view-titlebar-list-item">
				<a href="/" class="view-titlebar-link" @click="onMenuTriggerClick">
					<icon asset="hamburger"></icon>
					<icon :asset="appIcon" :title="appTitle"></icon> {{ titleToRender }}
				</a>
			</li>
		</ul>

		<!-- Main menu -->
		<titlebar-menu class="view-titlebar-list-primary hide-under-small">

			<!-- Logo and home link -->
			<router-link
				class="view-titlebar-list-item"
				tag="li"
				active-class="view-titlebar-list-item-active"
				exact-active-class="view-titlebar-list-item-active"
				:to="{
					name: 'root'
				}">
				<a class="view-titlebar-link"><icon :asset="appIcon" :title="appTitle"></icon> {{ appTitle }}</a>
			</router-link>

		</titlebar-menu>

		<!-- Secondary elements -->
		<ul class="view-titlebar-list-secondary">

			<fade>

				<!-- Network activity spinner -->
				<li class="view-titlebar-list-item view-titlebar-api-spinner" v-if="apiSpinnerVisible" key="api-spinner">
					<span class="view-titlebar-list-item-content">
						<inline-spinner class="view-titlebar-api-spinner" :adjust="false"></inline-spinner>
					</span>
				</li>

				<!-- Offline indicator -->
				<li class="view-titlebar-list-item view-titlebar-offline" v-else-if="isOffline" key="offline">
					<span class="view-titlebar-list-item-content">Offline</span>
				</li>

			</fade>

			<!-- User info -->
			<li class="view-titlebar-list-item view-titlebar-profile" v-if="isLoggedIn">
				<click class="view-titlebar-list-item-content" :callback="showAccountNotification">
					<pic-img :src="currentAccountAvatarUrl"></pic-img><span class="hide-under-medium">{{ currentAccountName }}</span>
				</click>
			</li>

			<!-- Redirect to remote logout -->
			<!-- <li class="view-titlebar-list-item">
				<a :href="logoutPath" class="view-titlebar-list-item-content">
					<icon asset="power"></icon>
				</a>
			</li> -->

			<!-- Readme button -->
			<li class="view-titlebar-list-item">
				<click class="view-titlebar-list-item-content" :callback="openReadme">
					<icon asset="help"></icon>
				</click>
			</li>

		</ul>

	</div>

</template>

<style lang="scss">
	@import '~@shared-styles';

	.view-titlebar {
		line-height: 1;

		background-color: $color-white;
		@include shadow;

		@include transition-slow;
		@include transition-properties-common;

		ul,
		ol,
		p {
			@include no-push-vertical;
		}

		// FIXME: I'd like to have generic transition classes here even if I've chosen to use a named transition in the parent component
		&.transition-hide-up-enter,
		&.transition-hide-up-leave-to {
			@include shadow-transparent;
		}

		.view-pic-img,
		.view-icon,
		.view-spinner {
			width: 1em;
			height: 1em;
			// margin-left: 0.25em;
			// margin-right: 0.25em;
			// transform: scale(1.5);
			vertical-align: top;
		}

	}

	.view-titlebar-scrolled {
		@include shadow-loose;
	}

	.view-titlebar-offline {
		color: $color-orange;
	}

	.view-titlebar-api-spinner {
		color: $color-blue;
	}

	.view-titlebar-profile {
		.view-pic-img {
			width: 1em;
			@include radius-round;
			@include viewport-over-medium {
				@include push-tight-right;
			}
		}
	}



	// List elements

	.view-titlebar,
	.view-titlebar-list-primary,
	.view-titlebar-list-secondary {
		@include clear-after;
	}

	.view-titlebar-list-primary {
		@include keep-left;
	}

	.view-titlebar-list-secondary {
		@include keep-right;
	}

	.view-titlebar-list {
		@include clear-after;
	}

	.view-titlebar-menu-item, // Child component
	.view-titlebar-list-item {
		@include keep-left;
	}

	.view-titlebar-menu-link, // Child component
	.view-titlebar-link,
	.view-titlebar-list-item-content {
		display: block;
		@include buffer-tight-even;
		border-top-width: 3px;
		border-bottom-width: 3px;
		border-color: transparent;
	}

	.view-titlebar-menu-link, // Child component
	.view-titlebar-link {
		@include transition-hover-active;
		@include transition-properties-common;

		// Undo default link styles
		// FIXME: shouldn't have to do this
		font-weight: inherit;
		color: inherit;

		// &:hover {
		// 	background-color: $color-verylightgrey;
		// }

		&:active {
			transform: scale($scale-small);
		}

	}

</style>
