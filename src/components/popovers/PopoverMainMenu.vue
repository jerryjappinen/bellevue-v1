<script>
	import { menu } from '@services';

	export default {
		name: 'popover-main-menu',

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

	<div class="view-popover-main-menu no-rhythm">
		<ul>

			<!-- Each link -->
			<router-link
				class="view-popover-main-menu-item"
				active-class="view-popover-main-menu-item-active"
				exact-active-class="view-popover-main-menu-item-active"
				tag="li"
				v-for="(link, index) in displayedLinks"
				:key="index"
				:to="composeRouterLink(link)">
				<a class="view-popover-main-menu-link">{{ link.label }}</a>
			</router-link>

		</ul>
	</div>

</template>

<style lang="scss">
	@import '~@shared-styles';

	.view-popover-main-menu {
		@include buffer-tight-even;
		min-width: $width-body-verytight;
	}

</style>
