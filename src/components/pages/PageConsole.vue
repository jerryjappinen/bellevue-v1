
<script>

	export default {

		name: 'page-console',

		computed: {

			title: function () {
				return this.$route.name;
			}

		}

	};

</script>

<template>

	<div class="view-page-console">

		<h1>Debug {{ title }}</h1>

		<ul class="view-page-console-menu inline-block">
			<li><router-link :to="{ name: 'consoleComponents' }" >Components</router-link></li>
			<li><router-link :to="{ name: 'consoleConfiguration' }" >Configuration</router-link></li>
			<li><router-link :to="{ name: 'consoleModels' }" >Models</router-link></li>
			<li><router-link :to="{ name: 'consolePlugins' }" >Plugins</router-link></li>
			<li><router-link :to="{ name: 'consoleServices' }" >Services</router-link></li>
		</ul>

		<transition name="transition-fade" mode="out-in">
			<router-view></router-view>
		</transition>

	</div>

</template>

<style lang="scss">
	// @import '~@styles/shared';
	.view-page-console-menu {
		.is-exact-active {
			text-decoration: underline;
		}
	}
</style>
