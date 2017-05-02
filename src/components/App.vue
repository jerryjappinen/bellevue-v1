<template>

	<div class="app" id="app">

		<!-- Just a reference to static assets with resolved URLs -->
		<!-- FIXME: how do I reference project root so that URL resolver understands this (I'd like to use the same URL regardless of where my component file is)? -->
		<p>
			<img class="app-logo" src="../assets/logo.png">
			<img class="app-logo" src="../assets/some/folder/anotherlogo.png">
		</p>

		<ul>
			<li>Global counter value "{{ globalCounterValue }}" is maintained by Vuex.</li>
			<li><a href="#/">Welcome</a></li>
			<li><a href="#/arbitrary">PageSomething</a></li>
			<li>router-link: <router-link :to="customLinkTarget">{{ customLinkLabel }}</router-link></li>
			<li>Dynamic: <a href="#" @click.prevent="onCustomLinkClick">{{ customLinkLabel }}</a></li>
		</ul>

		<!-- First-level router view -->
		<transition name="transition-fade" mode="out-in" appear>
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</transition>

	</div>

</template>

<script>

	export default {

		name: 'app',

		computed: {

			globalCounterValue: function () {
				return this.$store.state.counter;
			},

			customLinkTarget: function () {
				var target = this.$route.name === 'PageSomething' ? 'Hello' : 'PageSomething';
				return {
					name: target
				};
			},

			customLinkLabel: function () {
				return this.customLinkTarget.name;
			}

		},

		methods: {

			onCustomLinkClick: function () {
				this.$router.push(this.customLinkTarget);
			}

		}

	};

</script>

<!--
Custom styles
http://vuejs-templates.github.io/webpack/pre-processors.html

NOTE
- URL resolving will handle the URL correctly
- Webpack will compile SCSS
- Target file is a manifest, which imports the actual global styles
- You will get weird vue-style-loader issues in case the path is wrong
-->
<style src="../styles/global.scss" lang="scss"></style>

<!-- Root component styles -->
<style lang="scss">

	// FIXME: do I really need this in every component definition?
	@import '../styles/shared.scss';

	.app {
		@include buffer-relative;
	}

	.app-logo {
		height: 2em;
	}

</style>

<!-- Style utilities included AFTER component code so their specificity is higher by default -->
<style src="../styles/utilities.scss" lang="scss"></style>
