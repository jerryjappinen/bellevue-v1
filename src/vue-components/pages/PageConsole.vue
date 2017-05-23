
<script>

	import ConsoleComponents from '@components/console/ConsoleComponents';
	import ConsoleConfiguration from '@components/console/ConsoleConfiguration';
	import ConsoleModels from '@components/console/ConsoleModels';
	import ConsolePlugins from '@components/console/ConsolePlugins';
	import ConsoleServices from '@components/console/ConsoleServices';

	export default {

		name: 'page-console',

		components: {
			ConsoleComponents: ConsoleComponents,
			ConsoleConfiguration: ConsoleConfiguration,
			ConsoleModels: ConsoleModels,
			ConsolePlugins: ConsolePlugins,
			ConsoleServices: ConsoleServices
		},

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
			<li><router-link :to="{ name: 'console' }" >Components</router-link></li>
			<!--<li><router-link :to="{ name: 'consoleComponents' }" >Components</router-link></li>-->
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
	// @import '~@styles/shared.scss';
	.view-page-console-menu {
		.is-exact-active {
			text-decoration: underline;
		}
	}
</style>
