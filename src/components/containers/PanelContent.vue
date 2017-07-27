
<script>
	export default {
		name: 'panel-content'
	};
</script>

<template>

	<div class="view-panel-content">
		<slot></slot>
	</div>

</template>

<style lang="scss">
	@import '~@shared-styles';

	.view-panel-content {
		@include buffer-tight-even;

		@include viewport-over-tiny {
			@include buffer-even;
		}

	}

</style>
