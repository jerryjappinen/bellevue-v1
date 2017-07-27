
<script>
	export default {
		name: 'inline-icon',

		props: {
			asset: {},
			scaleUp: {
				default: true
			},
			adjust: {
				default: true
			},
			title: {}
		}

	};

</script>

<template>

	<icon class="view-inline-icon" :asset="asset" :scale-up="scaleUp" :adjust="adjust" :title="title"></icon>

</template>

<style lang="scss">
	// .view-inline-icon {}
</style>
