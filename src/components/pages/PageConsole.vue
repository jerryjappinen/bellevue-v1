
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

	<page class="view-page-console">

		<h1>Debug {{ title }}</h1>

		<tabs :links="tabs"></tabs>

		<fade>
			<router-view></router-view>
		</fade>

	</page>

</template>

<style lang="scss">
	// @import '~@shared-styles';
</style>
