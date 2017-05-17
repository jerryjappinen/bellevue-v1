<script>

	import ConsoleComponents from '@components/console/ConsoleComponents';
	import ConsoleConfiguration from '@components/console/ConsoleConfiguration';
	import ConsoleModels from '@components/console/ConsoleModels';
	import ConsolePlugins from '@components/console/ConsolePlugins';

	export default {
		name: 'console',
		components: {
			ConsoleComponents: ConsoleComponents,
			ConsoleConfiguration: ConsoleConfiguration,
			ConsoleModels: ConsoleModels,
			ConsolePlugins: ConsolePlugins
		}
	};

</script>

<template>

	<div class="view-console">
		<console-components></console-components>
		<console-configuration></console-configuration>
		<console-models></console-models>
		<console-plugins></console-plugins>
	</div>

</template>

<style lang="scss">

</style>
