
<script>
	export default {
		name: 'popover-main-menu'
	};
</script>

<template>

	<div class="view-popover-main-menu">
		<ul class="no-push-vertical">
			<li><router-link :to="{ name: 'root' }">Home</router-link></li>
			<li><router-link :to="{ name: 'arbitrary' }">Sample page</router-link></li>
			<li><router-link :to="{ name: 'list' }">List</router-link></li>
		</ul>
	</div>

</template>

<style lang="scss">
	@import '~@shared-styles';

	.view-popover-main-menu {
		@include buffer-even;
	}

</style>
