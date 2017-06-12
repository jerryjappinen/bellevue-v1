
<script>

	import { popovers } from '@services';

	export default {
		name: 'popover-main-menu',

		computed: {},

		methods: {

			onMenuItemClick: function () {
				popovers.close();
			}

		}

	};

</script>

<template>

	<div class="view-popover-main-menu">
		<ul class="buffer-even no-push-vertical">
			<li><router-link :to="{ name: 'root' }" @click.native="onMenuItemClick">Home</router-link></li>
			<li><router-link :to="{ name: 'arbitrary' }" @click.native="onMenuItemClick">Sample page</router-link></li>
		</ul>
	</div>

</template>

<style lang="scss">
	// @import '~@shared-styles';
	// .view-popover-main-menu {}
</style>
