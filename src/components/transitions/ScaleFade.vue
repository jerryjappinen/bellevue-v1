<script>
	export default {
		name: 'scale-fade',

		props: [
			'name',
			'mode',
			'appear'
		]

	};
</script>

<template>
	<custom-transition name="scale-fade" :mode="mode" :appear="appear"><slot></slot></custom-transition>
</template>

<style lang="scss"></style>
