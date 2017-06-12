
<script>

	export default {

		name: 'panel-console',

		data: function () {
			return {
				component: 'console-components',
				tabs: [
					{
						label: 'Components',
						component: 'console-components'
					},
					{
						label: 'Configuration',
						component: 'console-configuration'
					},
					{
						label: 'Models',
						component: 'console-models'
					},
					{
						label: 'Plugins',
						component: 'console-plugins'
					},
					{
						label: 'Services',
						component: 'console-services'
					},
					{
						label: 'Vuex',
						component: 'console-vuex'
					}
				]
			};
		},

		computed: {

			title: function () {
				return this.component;
			}

		},

		methods: {

			getTabSelectedOn: function (link) {
				return link.component === this.component ? true : false;
			},

			setComponent: function (event, link) {
				this.component = link.component;
			}

		}

	};

</script>

<template>

	<div class="view-panel-console">
		<div class="buffer-relative">

			<h2>{{ title }}</h2>

			<tabs :links="tabs" :callback="setComponent" :selectedOn="getTabSelectedOn"></tabs>

			<!-- <ul class="view-panel-console-menu inline-block">
				<li><a href="" @click.prevent="setComponent('console-components')">Components</a></li>
				<li><a href="" @click.prevent="setComponent('console-configuration')">Configuration</a></li>
				<li><a href="" @click.prevent="setComponent('console-models')">Models</a></li>
				<li><a href="" @click.prevent="setComponent('console-plugins')">Plugins</a></li>
				<li><a href="" @click.prevent="setComponent('console-services')">Services</a></li>
			</ul>-->

			<!--NOTE: routing not supported here-->
			<transition name="transition-fade" mode="out-in">
				<component :is="component" :key="component"></component>
			</transition>

		</div>
	</div>

</template>

<style lang="scss">
	// @import '~@shared-styles';
	.view-panel-console-menu {
		.is-active {
			text-decoration: underline;
		}
	}
</style>
