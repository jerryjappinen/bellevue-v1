
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
			<li><router-link :to="{ name: 'arbitrary' }" @click.native="onMenuItemClick">More stuff</router-link></li>
			<li><router-link :to="{ name: 'console' }" @click.native="onMenuItemClick">Console</router-link></li>
		</ul>
	</div>

</template>

<style lang="scss">
	// @import '~@styles/shared';
	// .view-popover-counter {}
</style>
