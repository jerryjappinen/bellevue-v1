<script>
	import { menu } from '@services';

	export default {
		name: 'titlebar-menu',

		computed: {

			displayedLinks: function () {
				return menu.accessibleLinksWithoutRoot;
			}

		},

		methods: {

			composeRouterLink: function (link) {
				return menu.composeRouterLink(link, this.$route);
			}

		}

	};

</script>

<template>

	<ul class="view-titlebar-menu">

		<!-- Allow injecting links at the start -->
		<slot></slot>

		<template v-if="displayedLinks.length">

			<!-- Each link -->
			<router-link
				class="view-titlebar-menu-item"
				active-class="view-titlebar-menu-item-active"
				exact-active-class="view-titlebar-menu-item-active"
				tag="li"
				v-for="(link, index) in displayedLinks"
				:key="index"
				:to="composeRouterLink(link)">
				<a class="view-titlebar-menu-link">{{ link.label }}</a>
			</router-link>

		</template>

	</ul>

</template>

<style lang="scss">
	@import '~@shared-styles';

	// We provided a custom classname for the router-link element in the template so we don't have to nest this selector
	.view-titlebar-menu-item-active {
		.view-titlebar-menu-link {
			border-bottom-color: $color-primary;
		}
	}

</style>
