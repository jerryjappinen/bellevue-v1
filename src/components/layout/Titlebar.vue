
<script>

	import { dom, events, string } from '@util';
	import { network, panels, popovers, time, viewport } from '@services';
	import config from '@config';

	export default {
		name: 'titlebar',

		data: function () {
			return {};
		},

		props: {
			title: {
				type: String,
				required: false
			}
		},

		computed: {

			titleToRender: function () {
				if (this.title) {
					var title = string.trimWhitespace(this.title);
					if (title.length) {
						return title;
					}
				}
				return config.meta.title;
			},

			networkStatus: function () {
				return network.isOnline ? 'Online' : 'Offline';
			},

			// NOTE: localised timestamp
			timeToShow: function () {
				return this.$d(time.current, 'short');
			},

			isScrolled: function () {
				return viewport.isScrolled;
			},

			classes: function () {
				return dom.composeClassnames({
					scrolled: this.isScrolled
				}, 'view-titlebar');
			}

		},

		methods: {

			onTimestampClick: function () {
				panels.open('PanelConsole');
			},

			onMenuTriggerClick: function (event) {

				// FIXME: This should be written as a custom modifier for Vue if possible
				// E.g. @click.meta="onMenuTriggerClick"
				if (!events.eventHasMetaKey(event)) {
					event.preventDefault();
					popovers.open('PopoverMainMenu');
				}

			}

		}

	};

</script>

<template>

	<div class="view-titlebar" :class="classes">

		<!--
			Quick-and-dirty sample menu with different types of links. Normally you would render a list like this with a separate component.
		-->

		<!--
		<ul>
			<li><a href="#/">Welcome</a></li>
			<li><a href="#/arbit">Sample page</a></li>
			<li><a href="#/console">Console</a></li>
			<li>router-link: <router-link :to="{ name: 'root' }">Home</router-link></li>
			<li>router-link: <router-link :to="{ name: 'arbitrary' }">Sample page</router-link></li>
			<li>Dynamic: <a href="#" @click.prevent="onCustomLinkClick">{{ customLinkLabel }}</a></li>
		</ul>
		-->



		<!-- Hamburger menu link -->
		<ul class="view-titlebar-list-primary hide-over-small">
			<li class="view-titlebar-list-item">
				<a href="/" class="view-titlebar-link" @click="onMenuTriggerClick">
					<icon asset="hamburger"></icon>
					<pic-img class="view-titlebar-link-image" title="Foo" src="logo.png" hide-until-loaded></pic-img> {{ titleToRender }}
				</a>
			</li>
		</ul>

		<!-- Main menu -->
		<ul class="view-titlebar-list-primary hide-under-small">

			<!-- Logo and home link -->
			<li class="view-titlebar-list-item">
				<router-link class="view-titlebar-link" :to="{ name: 'root' }">
					<pic-img class="view-titlebar-link-image" title="Foo" src="logo.png" hide-until-loaded-img></pic-img> Home
				</router-link>
			</li>

			<!-- Menu items -->
			<li class="view-titlebar-list-item">
				<router-link class="view-titlebar-link" :to="{ name: 'arbitrary' }">Sample page</router-link>
			</li>
			<li class="view-titlebar-list-item">
				<router-link class="view-titlebar-link" :to="{ name: 'list' }">List</router-link>
			</li>

			<!--<li class="view-titlebar-list-item">
				<router-link class="view-titlebar-link" :to="{ name: 'console' }">Console</router-link>
			</li>-->

		</ul>

		<!-- Secondary elements -->
		<ul class="view-titlebar-list-secondary">
			<li class="view-titlebar-list-item">
				<click class="view-titlebar-list-item-content" :callback="onTimestampClick">
					{{ networkStatus }}  &bullet; {{ timeToShow }}
				</click>
			</li>
		</ul>

	</div>

</template>

<style lang="scss">
	@import '~@shared-styles';

	.view-titlebar {
		@include fill-width-fixed;
		line-height: 1;
		top: 0;

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

	}

	.view-titlebar-scrolled {
		@include shadow-loose;
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

	.view-titlebar-list-item {
		@include keep-left;
	}

	.view-titlebar-link,
	.view-titlebar-list-item-content {
		display: block;
		@include buffer-tight-even;
		border-top-width: 3px;
		border-bottom-width: 3px;
		border-color: transparent;
	}

	.view-titlebar-link {
		@include transition-hover-active;
		@include transition-properties-style;

		// Undo default link styles
		// FIXME: shouldn't have to do this
		font-weight: inherit;
		color: inherit;

		&:hover {
			background-color: $color-verylightgrey;
		}

		// NOTE: we try to use a small set of prefixes like .is-, .not-, .has-, or .no- in our state classes
		// This one comes from router configuration, but we could also provide a specific classnamr for the router-link element in the template
		&.is-active {
			border-bottom-color: $color-primary;
		}

	}

	.view-titlebar-link-image {
		width: 1em;
		height: 1em;
		// margin-left: 0.25em;
		// margin-right: 0.25em;
		// transform: scale(1.5);
		vertical-align: top;
	}

</style>
