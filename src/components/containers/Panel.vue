<script>
	export default {
		name: 'panel'
	};
</script>

<template>

	<div class="view-panel">
		<div class="view-panel-scroll">
			<slot></slot>
		</div>
	</div>

</template>

<style lang="scss">
	@import '~@shared-styles';

	.view-panel {
		@include fill-relative;
		overflow: hidden;

		.view-panel-content {
			+ .view-panel-content {
				border-top-width: 1px;
			}
		}

	}

	.view-panel-scroll {
		position: absolute;
	}

	.view-panel-scroll {
		@include fill;
		z-index: 1;
		overflow: auto;
	}

</style>
