<script>
	export default {
		name: 'card',

		props: {

			buffer: {
				required: false,
				default: true
			}

		}

	};
</script>

<template>

	<!-- NOTE: better to ditch utility class? -->
	<div class="view-card" :class="buffer ? 'container-card-buffer' : 'container-card'">
		<slot></slot>
	</div>

</template>

<style lang="scss">
	// @import '~@shared-styles';
	// .view-card {}
</style>
