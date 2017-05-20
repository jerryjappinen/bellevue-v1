
<script>

	import ConsoleComponents from '@components/console/ConsoleComponents';
	import ConsoleConfiguration from '@components/console/ConsoleConfiguration';
	import ConsoleModels from '@components/console/ConsoleModels';
	import ConsolePlugins from '@components/console/ConsolePlugins';

	export default {

		name: 'page-console',

		components: {
			ConsoleComponents: ConsoleComponents,
			ConsoleConfiguration: ConsoleConfiguration,
			ConsoleModels: ConsoleModels,
			ConsolePlugins: ConsolePlugins
		},

		metaInfo: {
			title: 'Debugging stuff'
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

		<ul class="inline-block">
			<li><router-link :to="{ name: 'console' }" >Components</router-link></li>
			<!--<li><router-link :to="{ name: 'consoleComponents' }" >Components</router-link></li>-->
			<li><router-link :to="{ name: 'consoleConfiguration' }" >Configuration</router-link></li>
			<li><router-link :to="{ name: 'consoleModels' }" >Models</router-link></li>
			<li><router-link :to="{ name: 'consolePlugins' }" >Plugins</router-link></li>
		</ul>

		<transition name="transition-fade">
			<router-view></router-view>
		</transition>

	</div>

</template>

<style lang="scss">
	// @import '~@styles/shared.scss';
	// .view-page-console {}
</style>
