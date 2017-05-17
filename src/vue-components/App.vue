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

	// Config
	import customConfiguration from '@/config';

	// Child components
	import Pic from '@components/snippets/Pic';



	// NOTE
	//
	// This is our app's root component. We should keep this as simple as possible, it should probably only render child components.

	export default {

		// We need to use names in order for recursive components to work, so better to just keep it consistent
		// NOTE: Vue will standardize the casing, but we'll use the same casing as in file names here
		name: 'app',

		// directives: {},

		components: {
			Pic: Pic
		},

		metaInfo: {
			title: customConfiguration.meta.title
		},

		data: function () {
			return {
				notificationClearingSub: null,
				notificationText: ''
			};
		},

		computed: {

			notificationShouldBeVisible: function () {
				if (_.isString(this.notificationText) && !_.isEmpty(this.notificationText)) {
					return true;
				}
				return false;
			},

			globalCounterValue: function () {
				return this.$store.state.counter;
			},

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

			clearNotificationText: function () {
				this.notificationText = '';
			},

			onCustomLinkClick: function () {
				this.$router.push(this.customLinkTarget);
			}

		},

		watch: {

			notificationText: function (notificationText) {
				if (_.isEmpty(notificationText)) {
					this.notificationClearingSub = setTimeout(this.clearNotificationText, 200);
				}
			}

		}

	};

</script>



<template>

	<div class="view-app">

		<!--
			FIXME

			- Can I reference project root for URL resolver somehow?
			- I'd like to use the same URL regardless of where my component file is in the project structure, as they will move around a lot when refactoring.
			- We can maybe write a workaround in an image component that can handle SVG sprites and other things without code duplication.
		-->

		<transition name="transition-fade">
			<p v-if="notificationShouldBeVisible">{{ notificationText }}</p>
		</transition>



		<!-- References to static assets with resolved URLs -->
		<p><pic class="view-app-logo" title="Foo" src="some/folder/anotherlogo.png" hide-until-loaded></pic> Global counter value "{{ globalCounterValue }}" is maintained by Vuex.</p>



		<!-- Sample menu with different types of links -->

		<ul class="view-app-menu">
			<li><a href="#/">Welcome</a></li>
			<li><a href="#/arbit">More stuff</a></li>
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

	.view-app {
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
