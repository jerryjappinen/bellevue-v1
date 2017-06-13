
<script>

	export default {
		name: 'page-console',

		data: function () {
			return {
				tabs: [
					{
						label: 'Components',
						route: {
							name: 'consoleComponents'
						}
					},
					{
						label: 'Configuration',
						route: {
							name: 'consoleConfiguration'
						}
					},
					{
						label: 'Models',
						route: {
							name: 'consoleModels'
						}
					},
					{
						label: 'Plugins',
						route: {
							name: 'consolePlugins'
						}
					},
					{
						label: 'Services',
						route: {
							name: 'consoleServices'
						}
					},
					{
						label: 'Vuex',
						route: {
							name: 'consoleVuex'
						}
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
