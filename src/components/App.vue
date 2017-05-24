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



	// Vendor code
	import _ from 'lodash';

	// Services
	import { network, time, popovers } from '@services';

	// Config
	import config from '@config';



	// NOTE
	//
	// This is our app's root component. We should keep this as simple as possible, it should probably only render child components.

	export default {

		// We need to use names in order for recursive components to work, so better to just keep it consistent
		// NOTE: Vue will standardize the casing, but we'll use the same casing as in file names here
		name: 'app',

		// directives: {},

		metaInfo: function () {

			// NOTE
			// - route names shouldn't be used in the UI like this
			// - BUT: we could use them as keys, as this should go through localisation anyway
			return {
				title: this.$route.name + ' – ' + config.meta.title
			};

		},

		data: function () {
			return {
				notificationClearingTimeout: null,
				notificationText: null
			};
		},

		computed: {

			// Trigger popovers

			popoverShouldBeShown: function () {
				return popovers.component ? true : false;
			},



			// Pseudo notification samples

			currentTime: function () {
				return time.current;
			},

			networkStatus: function () {
				return network.isOnline ? 'Online' : 'Offline';
			},

			networkMessage: function () {
				return network.isOffline ? 'You are offline - please check your connection!' : null;
			},

			notificationTextToRender: function () {
				return this.notificationText ? this.notificationText : this.networkMessage;
			},

			notificationShouldBeVisible: function () {
				if (_.isString(this.notificationTextToRender) && !_.isEmpty(this.notificationTextToRender)) {
					return true;
				}
				return false;
			},


			// Counter samples

			globalCounterValue: function () {
				return this.$store.state.counter;
			},



			// Menu samples

			customLinkTarget: function () {
				var target = this.$route.name === 'arbitrary' ? 'hello' : 'arbitrary';
				return {
					name: target
				};
			},

			customLinkLabel: function () {
				return this.customLinkTarget.name === 'arbitrary' ? 'More stuff' : 'Welcome';
			}

		},

		methods: {

			// Notification samples

			clearNotificationText: function () {
				this.notificationText = null;
			},

			setNotificationText: function () {
				this.notificationText = 'This is a text message.';
			},



			// Menu samples

			onCustomLinkClick: function () {
				this.$router.push(this.customLinkTarget);
			}

		},

		watch: {

			// Quick and dirty: clear notification (doesn't update if notificationText changes during delay)
			notificationText: function (value) {
				if (value) {
					this.notificationClearingTimeout = setTimeout(this.clearNotificationText, 4 * 1000); // 4s delay
				}
			}

		}

		// created: function () {},

		// beforeDestroy: function () {}

	};

</script>



<template>

	<div class="view-app">

		<titlebar></titlebar>

		<!-- Popover elements will be rendered here in the structure regardless of their positioning -->
		<transition name="transition-fade">
			<popover v-if="popoverShouldBeShown"></popover>
		</transition>

		<div class="view-app-content">

			<!--

				NOTE
				- Example of how to use the key attribute to enable transitioning to elements of the same type.
				- Also enables transitioning out an element that contains a value whose value has already changed: Vue will keep the old value in the scope until the exit transition is complete.

				FIXME
				- this should be mentioned in guide about transitions

			-->
			<div>
				<transition name="transition-fade" mode="out-in">
					<p v-if="notificationShouldBeVisible" :key="'on-' + notificationTextToRender">{{ notificationTextToRender }}</p>
					<p v-else key="off" @click="setNotificationText">Set notification text</p>
				</transition>
				<p>
					{{ currentTime }} Network {{ networkStatus }} &bullet;
					<click class="inline-block radius-tight" :callback="clearNotificationText">Clear msg</click> &bullet;
					<click class="inline-block radius-tight" :callback="setNotificationText">Set msg</click>
				</p>
			</div>

			<hr>

			<!--
				References to static assets with resolved URLs
			-->
			<p><pic class="view-app-logo" title="Foo" src="some/folder/anotherlogo.png" hide-until-loaded></pic> Global counter value "{{ globalCounterValue }}" is maintained by Vuex.</p>

			<hr>

			<!--
				Quick-and-dirty sample menu with different types of links. Normally you would render a list like this with a separate component.
			-->
			<ul class="view-app-menu">
				<li><a href="#/">Welcome</a></li>
				<li><a href="#/arbit">More stuff</a></li>
				<li><a href="#/console">Console</a></li>
				<li>router-link: <router-link :to="{ name: 'hello' }">Welcome</router-link></li>
				<li>router-link: <router-link :to="{ name: 'arbitrary' }">More stuff</router-link></li>
				<li>Dynamic: <a href="#" @click.prevent="onCustomLinkClick">{{ customLinkLabel }}</a></li>
			</ul>

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
	@import '~@styles/shared.scss';

	// Required for titlebar spacing
	// FIXME: hacky solution, can't be transitioned and is not 100 % accurate
	.view-app {
		padding-top: 1em + (2 * $buffer-tight);
	}

	.view-app-content {
		@include buffer-relative;
	}

	.view-app-logo {
		display: inline-block;
		width: 2em;
	}

	// NOTE: clearly this stuff should be in a separate component
	.view-app-menu {
		list-style: none;

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
