
<script>

	export default {
		name: 'page-console',

		data: function () {
			return {
				tabs: [
					{
						label: 'Components',
						route: 'consoleComponents'
					},
					{
						label: 'Configuration',
						route: 'consoleConfiguration'
					},
					{
						label: 'Models',
						route: 'consoleModels'
					},
					{
						label: 'Plugins',
						route: 'consolePlugins'
					},
					{
						label: 'Services',
						route: 'consoleServices'
					},
					{
						label: 'Vuex',
						route: 'consoleVuex'
					}
				]
			};
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

		<tabs :links="tabs"></tabs>

		<transition name="transition-fade" mode="out-in">
			<router-view></router-view>
		</transition>

	</div>

</template>

<style lang="scss">
	// @import '~@shared-styles';
</style>
