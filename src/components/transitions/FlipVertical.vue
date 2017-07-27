<script>
	export default {
		name: 'flip-vertical',

		props: [
			'name',
			'mode',
			'appear'
		]

	};
</script>

<template>
	<custom-transition name="flip-vertical" :mode="mode" :appear="appear"><slot></slot></custom-transition>
</template>

<style lang="scss"></style>
